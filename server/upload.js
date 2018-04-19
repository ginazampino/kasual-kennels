const crypto = require('crypto');
const mime = require('./node-mime');
const multer = require('multer');
const path = require('path');

const extensionsByMimeType = {
    'application/x-zip-compressed': 'zip'
};

/* Matches invalid characters in file names. */
const fileNameMask = /[^a-zA-Z0-9\-_]/g;

function getExtension(type) {
    return extensionsByMimeType[type.toLowerCase()]
        || mime.getExtension(type)
        || 'txt';
}

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../wwwroot/uploads'),
    filename: function (req, file, cb) {
        let filename = file.originalname;
        filename = filename.replace(/\.[a-zA-Z0-9]+$/, '');
        filename = filename.replace(fileNameMask, '');
        crypto.pseudoRandomBytes(4, (err, buf) => {
            if (err) return cb(err, null);
            filename += '_' + buf.toString('hex');
            filename += '.' + getExtension(file.mimetype);
            cb(null, filename);
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