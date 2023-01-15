const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const server = new grpc.Server();
let db;

const DDL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        gender INTEGER CHECK(gender IN (0,1,2)) DEFAULT 0
    );
`;

class UserDAO {
    static async create({ id, name, gender }) {
        try {
            await openDatabase();
            await db.exec(`
                INSERT INTO users ("id", "name", "gender")
                VALUES (${id}, '${name}', '${gender}');
            `);
            await closeDatabase();
            return {};
        } catch (err) {
            console.error(err);
        }
    }
    static async list() {
        try {
            await openDatabase();
            const res = await db.all(`SELECT * FROM users;`);
            await closeDatabase();
            return res;
        } catch (err) {
            console.error(err);
        }
    }
    static async read({ id }) {
        try {
            await openDatabase();
            const res = await db.all(`
                SELECT * 
                FROM users
                WHERE id = ${id};
            `);
            await closeDatabase();
            return res[0] ?? {};
        } catch (err) {
            console.error(err);
        }
    }
    static update(user) {

    }
    static delete(number) {

    }
}

async function createTable () {
    await openDatabase();
    await db.exec(DDL);
    await closeDatabase();
}

async function openDatabase () {
    db = await open({
        filename: 'database.sqlite',
        driver: sqlite3.Database
    });
}

async function closeDatabase () {
    await db.close();
}

async function startMicroservice() {
    await createTable();
    protoLoader.load('../shared/protos/user.proto').then(packageDefinition => {
        const proto = grpc.loadPackageDefinition(packageDefinition);

        server.addService(proto.UserService.service, {
            create: (call, callback) => {
                UserDAO.create(call.request);
                callback(null, {});
            },
            list: async (_, callback) => {
                const users = await UserDAO.list();
                callback(null, { users });
            },
            read: async (call, callback) => {
                const user = await UserDAO.read(call.request);
                callback(null, user);
            },
            update: (call, callback) => {
                console.log(call);
                callback(null, {});
            },
            delete: (call, callback) => {
                console.log(call);
                callback(null, {});
            }
        });
        
        server.bindAsync('127.0.0.1:50001', grpc.ServerCredentials.createInsecure(), () => {
            console.log('RUNNING');
            server.start();
            console.log('Server running on port 50001');
        });
    });
}

startMicroservice();