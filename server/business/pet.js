module.exports = class PetBusiness {
    constructor(conn) {
        this.conn = conn;
    }

    async create(request) {
        var body = request.body;
        var files = request.files;

        // image uploads
        var dali = files.dali && files.dali[0];
        var dane = files.dane && files.dane[0];
        var photo = files.photo[0];
        var thumb = files.thumb && files.thumb[0];

        photo = await this.conn.insert('images', {
            file_name: photo.filename
        });

        var pet = await this.conn.insert('pets', {
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
            image_photo_id: photo.insertId
        });

        return pet.insertId;
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

        let rows = await this.conn.query(sql, id);
        return rows && rows[0];
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

    update(request) {
        var body = request.body;

        this.conn.update('pets', {
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
            //image_photo_id: photo.insertId
        }, { id: request.query.id });
    }
};