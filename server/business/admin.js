const mysql = require('../mysql');

module.exports.getBreeds = async function () {
    const sql = `
        SELECT * FROM pet_breeds ORDER BY breed_name;
    `;
    let conn = await mysql.connect();
    return await conn.query(sql);
};

module.exports.getGenders = function () {
    return ['Male', 'Female'];
};