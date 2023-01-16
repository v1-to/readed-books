const UserDAO = require('./dao.js');

module.exports = {
    create: async (call, callback) => {
        await UserDAO.create(call.request);
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
    update: async (call, callback) => {
        await UserDAO.update(call.request);
        callback(null, {});
    },
    delete: async (call, callback) => {
        await UserDAO.delete(call.request);
        callback(null, {});
    }
};