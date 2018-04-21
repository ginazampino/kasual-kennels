const passwordHash = require('password-hash');

module.exports = class User {
    constructor(data) {
        Object.assign(this, data);
    }

    setPassword(password) {
        this.password = passwordHash.generate(password);
    }

    verifyPassword(password) {
        return passwordHash.verify(password, this.password);
    }
}