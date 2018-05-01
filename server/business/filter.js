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

    async search(filters) {
        const result = await this.conn.query(`
            CALL sp_search_pets(?, ?, ?)
        `, 
            filters.gender || null, 
            filters.ancestry || null, 
            filters.breed_id || null);

        const pets = result[0];

        //for (let i = 0; i < pets.length; i++) {
        //    pets[i].traits = this.getPetTraits(pets[i].id);
        //}

        return pets;
    }

    async getPetTraits(petId) {
        // TODO:
    }
};