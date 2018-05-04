const BaseClass = require('./base');

module.exports = class PetBusiness extends BaseClass {
    constructor(conn) {
        super();
        this.conn = conn;
    }

    async create(request) {
        const body = request.body;
        const files = request.files;

        let dali = files.dali && files.dali[0];
        let dane = files.dane && files.dane[0];
        let photo = files.photo[0];
        let thumb = files.thumb && files.thumb[0];

        if (dali) {
            dali = await this.conn.insert('images', {
                file_name: dali.filename
            });
        }

        if (dane) {
            dane = await this.conn.insert('images', {
                file_name: dane.filename
            });
        }

        photo = await this.conn.insert('images', {
            file_name: photo.filename
        });

        if (thumb) {
            thumb = await this.conn.insert('images', {
                file_name: thumb.filename
            });
        }

        var entity = await this.conn.insert('pets', {
            pet_name: body.pet_name,
            gender: body.gender,
            breed_id: body.breed_id,
            generation: body.generation,
            birth_date: body.birth_date,
            adoption_date: body.adoption_date,
            origin: body.origin,
            previous_owner: body.previous_owner,
            previous_site: body.previous_site,
            previous_url: body.previous_url,
            description: body.description,
            career_status: body.career_status,
            prefix_titles: body.prefix_titles,
            show_name: body.show_name,
            suffix_titles: body.suffix_titles,
            show_prefixes: body.show_prefixes,
            page_id: body.page_id,
            litter_id: body.litter_id,
            image_dali_id: dali && dali.insertId || null,
            image_dane_id: dane && dane.insertId || null,
            image_photo_id: photo.insertId,
            image_thumb_id: thumb && thumb.insertId || null
        });
        const petId = entity.insertId;

        if (body.traits) {
            for (let i = 0; i < body.traits.length; i++) {
                let traitId = body.traits[i];

                await this.conn.insert("pet_trait_values", {
                    pet_id: petId,
                    trait_id: traitId
                });
            }
        }

        return entity.insertId;
    }

    delete(id) {
        const sql = `
            UPDATE 
                pets
            SET 
                active = 0
            WHERE 
                id = ?
        `;
        
        return this.conn.query(sql, id);
    }

    getAll() {
        const sql = `
            SELECT
                pets.*
            ,   pages.page_name
            FROM
                pets
            INNER JOIN
                pages ON pets.page_id = pages.id
            WHERE
                pets.active = 1
            ORDER BY
                pet_name;
        `;

        return this.conn.query(sql);
    }

    async getOne(id) {
        const sql = `
            SELECT
                pets.*
            ,   dali.file_name as image_dali
            ,   dane.file_name as image_dane
            ,   photo.file_name as image_photo
            ,   thumb.file_name as image_thumb
            FROM
                pets
            LEFT JOIN
                images as dali ON pets.image_dali_id = dali.id
            LEFT JOIN
                images as dane ON pets.image_dane_id = dane.id
            LEFT JOIN
                images as photo ON pets.image_photo_id = photo.id
            LEFT JOIN
                images as thumb on pets.image_thumb_id = thumb.id
            WHERE
                pets.id = ?
        `;

        const pets = await this.conn.query(sql, id);
        const pet = pets[0];

        pet.traits = await this.getTraits(id);

        return pet;
    }

    getTraits(petId) {
        const sql = `
            SELECT
                pet_traits.id,
                pet_traits.trait_name,
                CASE
                    WHEN EXISTS (SELECT * FROM pet_trait_values WHERE pet_id = ? and trait_id = pet_traits.id) THEN 1
                    ELSE 0
                END as value
            FROM
                pet_traits
        `;
        return this.conn.query(sql, petId);
    }

    search(term) {
        const sql = `
            SELECT 
                pets.id
            ,   pets.pet_name as text
            FROM   
                pets
            WHERE  
                pet_name LIKE ?
        `;
        term = '%' + term + '%';

        return this.conn.query(sql, term);
    }

    async update(request) {
        const body = request.body;
        const files = request.files;

        let dali = files.dali && files.dali[0];
        let dane = files.dane && files.dane[0];
        let photo = files.photo && files.photo[0];
        let thumb = files.thumb && files.thumb[0];

        const pet = {};

        if (dali) {
            pet.image_dali_id = await this.upsertImage(body.image_dali_id, dali);
        };

        if (dane) {
            pet.image_dane_id = await this.upsertImage(body.image_dane_id, dane);
        };

        if (thumb) {
            pet.image_thumb_id = await this.upsertImage(body.image_thumb_id, thumb);
        };

        // required
        if (photo) {
            pet.image_photo_id = await this.upsertImage(body.image_photo_id, photo);
        };

        Object.assign(pet, {
            pet_name: body.pet_name,
            gender: body.gender,
            breed_id: body.breed_id,
            generation: body.generation,
            birth_date: body.birth_date,
            adoption_date: body.adoption_date,
            origin: body.origin,
            previous_owner: body.previous_owner,
            previous_site: body.previous_site,
            previous_url: body.previous_url,
            description: body.description,
            career_status: body.career_status,
            prefix_titles: body.prefix_titles,
            show_name: body.show_name,
            suffix_titles: body.suffix_titles,
            show_prefixes: body.show_prefixes,
            page_id: body.page_id,
            litter_id: body.litter_id
        });

        if (pet.page_id != 3) {
            pet.litter_id = null;
        }

        await this.conn.update('pets', pet, { id: request.query.id });

        this.conn.query('DELETE FROM pet_trait_values WHERE pet_id = ?', request.query.id);

        if (body.traits) {
            for (let i = 0; i < body.traits.length; i++) {
                let traitId = body.traits[i];

                await this.conn.insert("pet_trait_values", {
                    pet_id: request.query.id,
                    trait_id: traitId
                });
            }
        }
    };

    async getCrewPets() {
        const pets = await this.conn.query(`
        SELECT
            pets.pet_name
        ,   pets.active
        ,	pets.gender
        ,	pets.description
        ,	images.file_name as img
        FROM
            pets
        INNER JOIN
            pages ON pets.page_id = pages.id
        INNER JOIN
            images on pets.image_photo_id = images.id
        WHERE
            page_id = 1
        AND
            pets.active = 1
        `);

        return { pets };
    };

    async getSingles() {
        const pets = await this.conn.query(`
            SELECT
                pets.id
            ,   pets.active
            ,   pets.pet_name
            , 	pets.gender
            ,	images.file_name as img
            FROM
                pets
            INNER JOIN
                pages on pets.page_id = pages.id
            INNER JOIN
                images on pets.image_photo_id = images.id
            WHERE
                page_id = 4
            AND
                pets.active = 1
        `);

        for (let i = 0; i < pets.length; i++) {
            let pet = pets[i];
            pet.traits = await this.getPetTraits(pet.id);
        }

        return { pets };
    };

    async getPetTraits(petId) {
        const traits = await this.conn.query(`
            SELECT 
                pet_traits.trait_name 
            FROM 
                kasualkennels.pet_trait_values
            INNER JOIN
                pet_traits on pet_trait_values.trait_id = pet_traits.id
            WHERE
                pet_id = ?
        `, petId);

        return traits;
    };
};