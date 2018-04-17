module.exports = class DropdownBusiness {
    constructor(conn) {
        this.conn = conn;
    }

    getBreeds() {
        const sql = `
            SELECT *
            FROM pet_breeds
            ORDER BY breed_name;
        `;
        return this.conn.query(sql);
    }

    getGenders() {
        return ['Male', 'Female'];
    }

    getPetPages() {
        const sql = `
            SELECT * 
            FROM pages
            ORDER BY page_name
        `;
        return this.conn.query(sql);
    };

    getPetTraits() {
        const sql = `
            SELECT *
            FROM   pet_traits
            ORDER BY
                trait_name;
        `;
        return this.conn.query(sql);
    }

    getLitters() {
        const sql = `
            SELECT *
            FROM litters
            ORDER BY litter_name;
        `;
        return this.conn.query(sql);
    }

    getDownloadPages() { /* FIX ME */
        const sql = `
            SELECT * 
            FROM pages
            ORDER BY page_name
        `;
        return this.conn.query(sql);
    };

    getImageCategories() {
        const sql = `
            SELECT *
            FROM image_categories
            ORDER BY category_name;
        `;
        return this.conn.query(sql);
    };

    getShowPlacements() {
        const sql = `
            SELECT *
            FROM placements
            ORDER BY id;
        `;
        return this.conn.query(sql);
    }

    getShowCategories() {
        const sql = `
            SELECT *
            FROM show_categories
            ORDER BY id;
        `;
        return this.conn.query(sql);
    }

    getShowVenues() {
        const sql = `
            SELECT *
            FROM show_venues
            ORDER BY id;
        `;
        return this.conn.query(sql);
    }

    getOrigins() {
        return ['Adoption Center', 'Application', 'Breeding', 'Freebie', 'Gift', 'Grab Bag', 'Hexing', 'Sale', 'Trade'];
    }

    getProjectCategories() {
        return ['Hexed Breed', 'Selective Breed', 'Purebred/Noninbred Line'];
    }

    getProjectStatuses() {
        return ['Open', 'Limited', 'Closed'];
    }

    getStatuses() {
        return ['Not Applicable', 'Active', 'Inactive', 'Retired'];
    }
};