module.exports = class AdminBusiness {
    constructor(conn) {
        this.conn = conn;
    }

    getBreeds() {
        const sql = `
            SELECT   *
            FROM     pet_breeds
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
            WHERE id=1 
            OR id=2 
            OR id=8 
            OR id=9;
        `;
        return this.conn.query(sql);
    };

    getLitters() {
        const sql = `
            SELECT *
            FROM   litters
            ORDER BY litter_name;
        `;
        return this.conn.query(sql);
    }

    getDownloadPages() {
        const sql = `
            SELECT *
            FROM pages
            WHERE id=7
            OR id=11
            OR id=12
            OR id=10;
        `;
        return this.conn.query(sql);
    };

    getOrigins() {
        return ['Adoption Center', 'Application', 'Breeding', 'Freebie', 'Gift', 'Grab Bag', 'Hexing', 'Sale', 'Trade'];
    }

    getProjectCategories() {
        return ['Hexing Project', 'Breeding Project'];
    }

    getProjectStatuses() {
        return ['Open', 'Limited', 'Closed'];
    }

    getShowVenues() {
        ['Kasual Kennels (KK)', 'RKC Petz Forum (RKC)', 'Whiskerwick (WW)'];
    }

    getShowCategories() {
        return ['EBW Pose Show (Dali)', 'EBW Pose Show (Dane)', 'Standard Pose Show (Dali)', 'Standard Pose Show (Dane)', 'Contest'];
    }

    getShowPlacements() {
        return ['P', 'BIS', '1', '2', '3', 'HM'];
    }

    getImageCategories() {
        return ['Albums', 'Awards', 'Community Hubs', 'Fan Sites', 'Free-For-All Stamps', 'Limited Edition Stamps', 'Stamp Collection'];
    }

    getStatuses() {
        return ['Not Applicable', 'Active', 'Inactive', 'Retired'];
    }
};





// const mysql = require('../mysql');

// module.exports.getBreeds = async function() {
//     const sql = `
//         SELECT * 
//         FROM pet_breeds 
//         ORDER BY breed_name;
//     `;
//     let conn = await mysql.connect();
//     return await conn.query(sql);
// };

// module.exports.getGenders = function() {
//     return ['Male', 'Female'];
// };

// module.exports.getOrigins = function() {
//     return ['Adoption Center', 'Application', 'Breeding', 'Freebie', 'Gift', 'Grab Bag', 'Hexing', 'Sale', 'Trade'];
// };

// module.exports.getStatuses = function() {
//     return ['Not Applicable', 'Active', 'Inactive', 'Retired'];
// };

// module.exports.getPetPages = async function() {
//     const sql = `
//         SELECT * 
//         FROM pages 
//         WHERE id=1 
//         OR id=2 
//         OR id=8 
//         OR id=9;
//     `;
//     let conn = await mysql.connect();
//     return await conn.query(sql);
// };

// module.exports.getLitters = async function() {
//     const sql = `
//         SELECT *
//         FROM litters
//         ORDER BY litter_name;
//     `;
//     let conn = await mysql.connect();
//     return await conn.query(sql);
// };

// module.exports.getDownloadPages = async function() {
//     const sql = `
//         SELECT *
//         FROM pages
//         WHERE id=7
//         OR id=11
//         OR id=12
//         OR id=10;
//     `;
//     let conn = await mysql.connect();
//     return await conn.query(sql);
// };

// module.exports.getProjectCategories = function() {
//     return ['Hexing Project', 'Breeding Project'];
// };

// module.exports.getProjectStatuses = function() {
//     return ['Open', 'Limited', 'Closed'];
// };

// module.exports.getShowVenues = function() {
//     return ['Kasual Kennels (KK)', 'RKC Petz Forum (RKC)', 'Whiskerwick (WW)'];
// };

// module.exports.getShowCategories = function() {
//     return ['EBW Pose Show (Dali)', 'EBW Pose Show (Dane)', 'Standard Pose Show (Dali)', 'Standard Pose Show (Dane)', 'Contest'];
// };

// module.exports.getPlacements = function() {
//     return ['P', 'BIS', '1', '2', '3', 'HM'];
// };

// module.exports.getImageCategories = function() {
//     return ['Albums', 'Awards', 'Community Hubs', 'Fan Sites', 'Free-For-All Stamps', 'Limited Edition Stamps', 'Stamp Collection'];
// };