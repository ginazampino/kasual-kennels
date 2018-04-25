module.exports = class ProjectBusiness {
    constructor(conn) {
        this.conn = conn;
    }

    async create(request) {
        const body = request.body;
        const files = request.files;

        let imageUpload = files.image && files.image[0];

        imageUpload = await this.conn.insert("images", {
            file_name: imageUpload.filename
        });

        const entity = await this.conn.insert("projects", {
            project_name: body.project_name,
            category: body.category,
            completed_date: body.completed_date,
            project_status: body.project_status,
            description: body.description,
            image_id: imageUpload.insertId,
        });
        
        return entity.insertId
    };

    delete(id) {
        const sql = `
            UPDATE
                projects
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
                projects.*
            ,   projects.project_name
            FROM
                projects
            ORDER BY
                project_name;
        `;

        return this.conn.query(sql);
    };

    async getOne(id) {
        const sql = `
            SELECT
                projects.*
            ,   imageUpload.file_name as project_image
            FROM
                projects
            INNER JOIN
                images as imageUpload ON projects.image_id = imageUpload.id
            WHERE
                projects.id = ?
        `;

        let rows = await this.conn.query(sql, id);
        return rows && rows[0];
    };

    update(request) {
        const body = request.body;
        const files = request.files;

        let imageUpload = files.image && files.image[0];

        if (imageUpload) {
            this.conn.update("images", {
                file_name: imageUpload.filename
            }, {
                id: body.image_id
            });
        }

        this.conn.update("projects", {
            project_name: body.project_name,
            category: body.category,
            completed_date: body.completed_date,
            project_status: body.project_status,
            description: body.description,
        }, { id: request.query.id });
    };

    async getProjects() {
        const projects = await this.conn.query(`
            SELECT
                projects.project_name
            ,   projects.category
            ,	projects.project_status
            ,	projects.completed_date
            ,	projects.description
            ,	images.file_name as img
            FROM
                projects
            INNER JOIN
                images on projects.image_id = images.id
        `);

        return { projects };
    };
};