module.exports = class {
    constructor(conn) {
        this.conn = conn;
    }

    getBreeds() {
        return this.conn.query(`
            SELECT
                pet_breeds.id,
                pet_breeds.breed_name
            FROM pet_breeds ORDER BY breed_name ASC`);
    }

    search(filters) {
        const whereClauses = [];
        let limit = 999999;

        if (filters.gender) {
            whereClauses.push(`pets.gender = ${this.conn.escape(filters.gender)}`);
        }

        if (filters.ancestry) {
            whereClauses.push(`sp_IsInTraitName(pets.id, 'Inbred') = ${ filters.ancestry === 'Inbred' ? 1 : 0 }`);
        }

        if (filters.breed) {
            whereClauses.push(`pets.breed_id = ${this.conn.escape(filters.breed)}`);
        }

        if (!whereClauses.length) {
            whereClauses.push(' 1 = 1 ');
            limit = 10;
        }

        const sql = `
            SELECT
                *
            FROM
                pets
            WHERE
                ${
                    whereClauses.join(' AND ')
                }
            ORDER BY
                id DESC
            LIMIT
                ${ limit }
        `;

        return this.conn.query(sql);
    }
};