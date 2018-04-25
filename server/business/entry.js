module.exports = class EntryBusiness {
    constructor(conn) {
        this.conn = conn;
    };

    async create(request) {
        const body = request.body;

        const entity = await this.conn.insert("my_entries", {
            pet_id: body.pet_id,
            show_name: body.show_name,
            placement_id: body.placement_id,
            url: body.url,
            venue_id: body.venue_id,
            category_id: body.category_id,
            show_date: body.show_date
        });

        return entity.insertId
    };

    delete(id) {
        const sql = `
            UPDATE 
                my_entries
            SET 
                active = 0
            WHERE 
                id = ?
        `;

        return this.conn.query(sql, id);
    };

    getAll() {
        const sql = `
            SELECT
                my_entries.*
            ,   pets.pet_name
            FROM 
                my_entries
            INNER JOIN
                pets ON my_entries.pet_id = pets.id
            ORDER BY 
                id;
        `;
        return this.conn.query(sql);
    };

    async getOne(id) {
        const sql = `
            SELECT
                my_entries.*
            ,   pets.pet_name
            FROM
                my_entries
            INNER JOIN
                pets ON my_entries.pet_id = pets.id
            WHERE
                my_entries.id = ?
        `;

        let rows = await this.conn.query(sql, id);
        return rows && rows[0];
    };

    update(request) {
        const body = request.body;

        this.conn.update("my_entries", {
            pet_id: body.pet_id,
            show_name: body.show_name,
            placement_id: body.placement_id,
            url: body.url,
            venue_id: body.venue_id,
            category_id: body.category_id,
            show_date: body.show_date
        }, { id: request.query.id });
    };

    async getShowroom() {
        const pets = await this.conn.query(`
            SELECT
                pets.id
            ,	pets.pet_name
            ,	pets.prefix_titles
            , 	pets.show_prefixes
            ,	pets.show_name
            , 	pets.suffix_titles
            ,   pets.career_status
            , 	dali.file_name as dali_img
            , 	dane.file_name as dane_img
            FROM
                pets
            LEFT JOIN
                images as dali on pets.image_dali_id = dali.id
            LEFT JOIN
                images as dane on pets.image_dane_id = dane.id
            WHERE
                career_status = 'Active'
            OR
                career_status = 'Retired'
        `);

        for (let i = 0; i < pets.length; i++) {
            let pet = pets[i];
            pet.entries = await this.getShowroomEntries(pet.id);
        };

        return { pets }
    };

    async getShowroomEntries(petId) {
        const entries = await this.conn.query(`
            SELECT
                my_entries.show_name
            , 	my_entries.url
            ,	my_entries.show_date
            ,	placements.placement_name
            ,	show_categories.category_name
            ,	show_venues.venue_name
            FROM
                my_entries
            INNER JOIN
                placements on my_entries.placement_id = placements.id
            INNER JOIN
                show_categories on my_entries.category_id = show_categories.id
            INNER JOIN
                show_venues on my_entries.venue_id = show_venues.id
            WHERE
                pet_id = ?
            ORDER BY
                points DESC
        `, petId);
        
        return entries;
    };
};