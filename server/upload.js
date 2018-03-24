const crypto = require('crypto');
const mime = require('./node-mime');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../wwwroot/uploads'),
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, (err, bytes) => {
            cb(null, bytes.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

const factory = multer({ storage });

module.exports = upload;

/**
 * Upload middleware for Express.
 */
function upload(...args) {
    let fields = [];

    args.forEach(arg => {
        if (typeof arg === 'string') {
            fields.push({ name: arg });
        }
        else if (typeof arg == 'object') {
            fields.push(arg);
        }
    });

    if (!fields.length)
        throw new Error('Invalid call to upload(): no fields specified.');

    return factory.fields(fields);
}