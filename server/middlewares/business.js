const mysql = require('../mysql');

const businessModules = {
    'entry': require('../business/entry'),
    'dropdown': require('../business/dropdown'),
    filter: require('../business/filter'),
    'pet': require('../business/pet'),
    'litter': require('../business/litter'),
    'image': require('../business/image'),
    'project': require('../business/project'),
    'show': require('../business/show'),
    'download': require('../business/download')
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

    res.on('error', afterResponse);
    res.on('finish', afterResponse);
    res.on('close', afterResponse);

    return business;

    function afterResponse() {
        //console.log('Closing SQL connection');
        res.removeListener('error', afterResponse);
        res.removeListener('finish', afterResponse);
        res.removeListener('close', afterResponse);
        business.connection.close();
    }
}