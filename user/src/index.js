const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const UserService = require('./service.js');
const UserDAO = require('./dao.js')
const server = new grpc.Server();

async function startMicroservice() {
    const packageDefinition = await protoLoader.load('../shared/protos/user.proto');
    const proto = grpc.loadPackageDefinition(packageDefinition);

    server.addService(proto.UserService.service, UserService);
    
    await UserDAO.createTable();
    server.bindAsync('127.0.0.1:50001', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('User Server running on port 50001');
    });
}

startMicroservice();