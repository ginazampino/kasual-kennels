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

        for (let i = 0; i < pets.length; i++) {
            pets[i].traits = await this.getPetTraits(pets[i].id);
        }

        return pets;
    }

    async getPetTraits(petId) {
        const rows = await this.conn.query(`
            SELECT
                trait_name
            FROM
                pet_trait_values
            INNER JOIN
                pet_traits ON pet_trait_values.trait_id = pet_traits.id
            WHERE
                pet_trait_values.pet_id = ?
            ORDER BY
                trait_name
        `, petId);
        
        let traits = rows.map(row => row.trait_name);
        
        if (! traits.includes('Inbred'))
            traits.push('Non-inbred');
        
        if (! traits.includes('Mixed breed'))
            traits.push('Purebred');

        return traits.sort();
    }
};