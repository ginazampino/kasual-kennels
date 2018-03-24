const mysql = require('../mysql');

const businessModules = {
    'dropdown': require('../business/dropdown'),
    'pet': require('../business/pet')
}

/**
 * Installs the business middelware in the express app.
 * 
 * @param {Express} app The express app.
 */
module.exports.install = function (app) {
    app.use(async (req, res, next) => {
        
        try { req.business = await createBusiness(req, res); }
        catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
        
        next();
    });
};

async function createBusiness(req, res) {
    var business = {};
    business.connection = await mysql.connect();

    Object.keys(businessModules).forEach(name => {
        business[name] = new businessModules[name](business.connection);
    });

    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    return business;

    async function afterResponse() {
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);
        await business.connection.close();
    }
}