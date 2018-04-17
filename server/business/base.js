module.exports = class {
    async upsertImage(id, file) {
        const query = await this.conn.query(`
            INSERT INTO images ( id, file_name, active )
            VALUES ( ? , ? , 1 )
            ON DUPLICATE KEY UPDATE
            file_name = ?;
        `, id || null, file.filename, file.filename);
        return query.insertId || id;
    }
};