const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports = class DatabaseConnection {
    constructor() {
        this.connection = undefined;
    }

    async init() {
        this.connection = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });
    }

    async shutdown() {
        await this.connection.close();
    }

    static async runOperation(operation) {
        const db = new DatabaseConnection();
        try {
            await db.init();
            const res = await operation(db.connection);
            return res;
        } catch(err) {
            console.error(err);
        } finally {
            await db.shutdown();
        }
    }
}
