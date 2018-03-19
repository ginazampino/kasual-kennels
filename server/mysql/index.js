const mysql = require('mysql');

/** The maximum number of connection attempts to make when establishing a connection. */
const MAX_CONNECTION_ATTEMPTS = 5;

/** The wait interval after a failed conncetion before retrying. */
const CONNECTION_RETRY_INTERVAL = 100;

/**
 * Represents a MySQL/MariaDB connection with promisified queries.
 */
class Connection {
    /**
     * Creates a new Connection object.
     * @param {*} connection The native mysql connection object.
     */
    constructor(connection) {
        this.conn = connection;
    }

    /**
     * Inserts an entity into a table asynchronously.
     * @param {string} table The table name.
     * @param {object} entity The entity to insert.
     */
    insert(table, entity) {
        const statement = `INSERT INTO ``${table}`` SET ?`;
        return this.query(statement, entity);
    }

    /**
     * Executes an SQL query asynchronously.
     * @param {string} statement The SQL query statement.
     * @param {*} args The parameterized query arguments.
     */
    query(statement, ...args) {
        return new Promise((resolve, reject) => {
            this.conn.query(statement, args, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    /**
     * Performs a callback function under an SQL transaction.
     * @param {function} work The callback function. Must return a Promise.
     */
    async transaction(work) {
        if (!work || typeof work !== 'function') {
            throw new Error('Attempt to start a transaction without a callback function.');
        }

        await this._beginTransaction();
        try {
            await work();
            await this._commit();
        }
        catch (err) {
            await this._rollback();
            throw err;
        }
    }

    /**
     * Updates an entity in a table asynchronously.
     * @param {string} table The table name.
     * @param {object} entity The entity to update.
     */
    update(table, entity, condition) {
        if (!condition || typeof condition !== 'object') {
            throw new Error('Attempt to update an entity without a condition!');
        }
        const statement = `UPDATE ``${table}`` SET ? WHERE ?`;
        return this.query(statement, entity, condition);
    }

    _beginTransaction() {
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        })
    }

    _commit() {
        return new Promise((resolve, reject) => {
            this.conn.commit((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    _rollback() {
        return new Promise((resolve, reject) => {
            this.conn.rollback((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    /**
     * Establishes a MySQL connection asynchronously.
     */
    static connect() {
        return new Promise((resolve, reject) => {
            let attempts = MAX_CONNECTION_ATTEMPTS;
            let connection;

            tryConnect();

            function tryConnect() {
                connection = mysql.createConnection(Connection.ConnectionInfo);
                connection.connect((err) => {
                    if (err) {
                        if (!attempts) {
                            return reject(err);
                        }
                        return setTimeout(tryConnect, CONNECTION_RETRY_INTERVAL);
                    }
                    return resolve(new Connection(connection));
                });
            }
        });
    }

    /**
     * Sets the global connection info.
     * @param {Object} connectionInfo The connection arguments to pass to the native MySQL connect function.
     */
    static setConnectionInfo(connectionInfo) {
        Connection.ConnectionInfo = connectionInfo;
    }
}

module.exports = Connection;