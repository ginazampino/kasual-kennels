module.exports = class ShowBusiness {
    constructor(conn) {
        this.conn = conn;
    }

    async create(request) {
        var body = request.body;
        
        var entity = await this.conn.insert("shows", {
            show_name: body.show_name,
            url: body.url,
            venue_id: body.venue_id,
            category_id: body.category_id,
            show_date: body.show_date
        });

        const showId = entity.insertId;

        await this.conn.query(`
            INSERT INTO show_entries ( entry_name, placement_id, show_id )
            VALUES
                ( ? , 1 , ${showId} )
            ,   ( ? , 2 , ${showId} )
            ,   ( ? , 3 , ${showId} )
            ,   ( ? , 4 , ${showId} )
            ,   ( ? , 5 , ${showId} );
        `, ...body.entries);

        return entity.insertId;
    };

    delete(id) {
        const sql = `
            UPDATE
                shows
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
                shows.*
            ,   show_categories.category_name
            ,   show_venues.venue_name
            FROM
                shows
            INNER JOIN
                show_venues ON shows.venue_id = show_venues.id
            INNER JOIN
                show_categories ON shows.category_id = show_categories.id
            ORDER BY
                show_date;
        `;

        return this.conn.query(sql);
    };

    async getOne(id) {
        const entries = await this.getEntries(id);
        const sql = `
            SELECT
                shows.*
            ,   show_categories.category_name
            ,   show_venues.venue_name
            FROM
                shows
            INNER JOIN
                show_venues ON shows.venue_id = show_venues.id
            INNER JOIN
                show_categories ON shows.category_id = show_categories.id
            WHERE
                shows.id = ?
        `;

        const shows = await this.conn.query(sql, id);
        const show = shows[0];
        show.entries = entries;

        return show;
    };

    getEntries(showId) {
        const sql = `
            SELECT
                show_entries.*
            ,   placements.placement_name
            FROM
                show_entries
            INNER JOIN
                placements ON show_entries.placement_id = placements.id
            WHERE
                show_id = ?
            AND
                points > 0
            ORDER BY
                placement_id
        `;
        return this.conn.query(sql, showId);
    }

    getDefaultPlacements() {
        const sql = `
            SELECT * FROM placements WHERE points > 0
        `;
        return this.conn.query(sql);
    }

    update(request) {
        var body = request.body;

        this.conn.update("shows", {
            show_name: body.show_name,
            url: body.url,
            venue_id: body.venue_id,
            category_id: body.category_id,
            show_date: body.show_date
        }, { id: request.query.id });
    };
};