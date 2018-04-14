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
};