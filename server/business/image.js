module.exports = class ImageBusiness {
    constructor(conn) {
        this.conn = conn;
    }

    async create(request) {
        const body = request.body;
        const files = request.files;
        const imageUpload = files.image && files.image[0];

        const entity = await this.conn.insert("images", {
            category_id: body.category_id,
            file_name: imageUpload.filename,
            title: body.title,
            url: body.url
        });

        return entity.insertId;
    }

    delete(id) {
        const sql = `
            UPDATE images
                SET active = 0
                WHERE id = ?
        `;
        return this.conn.query(sql, id);
    }

    getAll() {
        const sql = `
            SELECT
                images.*
            ,   image_categories.category_name
            FROM
                images
            INNER JOIN
                image_categories ON images.category_id = image_categories.id
            WHERE
                category_id IS NOT NULL
            ORDER BY
                images.id DESC
        `;
        return this.conn.query(sql);
    }

    async getOne(id) {
        const sql = `
            SELECT
                *
            FROM
                images
            WHERE
                images.id = ?
        `;

        let rows = await this.conn.query(sql, id);
        return rows && rows[0];
    }

    update(request) {
        const body = request.body;
        const files = request.files;
        const imageUpload = files.image && files.image[0];

        const entity = {
            category_id: body.category_id,
            title: body.title,
            url: body.url
        };

        if (imageUpload) {
            entity.file_name = imageUpload.filename;
        }

        return this.conn.update("images", entity, { id: request.query.id });
    };

    async getAlbumImages() {
        const images = await this.conn.query(`
            SELECT
                images.file_name
            , 	images.title
            , 	images.url
            ,	image_categories.category_name
            FROM
                images
            INNER JOIN
                image_categories ON images.category_id = image_categories.id
            WHERE
                category_id = 1
        `);

        return { images };
    };

    async getAwardImages() {
        const images = await this.conn.query(`
            SELECT
                images.file_name
            , 	images.title
            , 	images.url
            ,	image_categories.category_name
            FROM
                images
            INNER JOIN
                image_categories ON images.category_id = image_categories.id
            WHERE
                category_id = 2
            ORDER BY
                images.id DESC
        `);

        return { images };
    };

    async getGiftImages() {
        const images = await this.conn.query(`
            SELECT
                images.file_name
            , 	images.title
            , 	images.url
            ,	image_categories.category_name
            FROM
                images
            INNER JOIN
                image_categories ON images.category_id = image_categories.id
            WHERE
                category_id = 6
        `);

        return { images };
    };

    async getStampImages() {
        const images = await this.conn.query(`
            SELECT
                images.file_name
            ,   images.url
            , 	images.title
            , 	image_categories.category_name
            FROM
                images
            INNER JOIN
                image_categories ON images.category_id = image_categories.id
            WHERE
                category_id = 5
            OR
                category_id = 7
            OR
                category_id = 8
            ORDER BY
                images.id DESC
        `);

        return { images };
    };

    async getLinkImages() {
        const images = await this.conn.query(`
            SELECT
                images.file_name
            ,   images.url
            , 	images.title
            , 	image_categories.category_name
            FROM
                images
            INNER JOIN
                image_categories ON images.category_id = image_categories.id
            WHERE
                category_id = 3
            OR
                category_id = 4
            ORDER BY
                images.file_name ASC
        `);
        
        return { images };
    };
};