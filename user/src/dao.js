const DatabaseConnection = require("./db");

const DDL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        gender INTEGER CHECK(gender IN (0,1,2)) DEFAULT 0
    );
`;

module.exports = class UserDAO {
    static async createTable() {
        return DatabaseConnection.runOperation((conn) => conn.exec(DDL));
    }
    static async create({ id, name, gender }) {
        return DatabaseConnection.runOperation((conn) => conn.exec(`
            INSERT INTO users ("id", "name", "gender")
            VALUES (${id}, '${name}', '${gender}');
        `));
    }
    static async list() {
        return DatabaseConnection.runOperation((conn) => conn.all(`SELECT * FROM users;`));
    }
    static async read({ id }) {
        const res = await DatabaseConnection.runOperation((conn) => conn.all(`
            SELECT * 
            FROM users
            WHERE id = ${id};
        `));
        return res[0] ?? {};
    }
    static update({ id, name, gender }) {
        function setUpdateFields(name, gender) {
            let str = '';
            if(name) str += 'name = ' + `'${name}'`;
            if(name && gender) str += ', '
            if(gender) str += 'gender = ' + `'${gender}'`;
            return str;
        }
        
        return DatabaseConnection.runOperation((conn) => conn.exec(`
            UPDATE users 
            SET ${setUpdateFields(name, gender)}
            WHERE id = ${id};
        `));
    }
    static delete({ id }) {
        return DatabaseConnection.runOperation((conn) => conn.exec(`
            DELETE FROM users
            WHERE id = ${id};
        `));
    }
}