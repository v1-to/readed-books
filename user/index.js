const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const server = new grpc.Server();

protoLoader.load('../shared/protos/user.proto').then(packageDefinition => {
    const proto = grpc.loadPackageDefinition(packageDefinition);

    server.addService(proto.UserService.service, {
        create: (call, callback) => {
            console.log(call);
            callback(null, {});
        },
        list: (_, callback) => {
            callback(null, { users: [{ id: 1, name: 'Vitor' }]});
        },
        read: (call, callback) => {
            console.log(call);
            callback(null, {});
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