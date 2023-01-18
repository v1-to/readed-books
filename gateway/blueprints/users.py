import stubs.user_pb2_grpc as pb2_grpc
import stubs.user_pb2 as pb2
from flask import Blueprint
import grpc

HOST, PORT = '127.0.0.1', 50001
users_blueprint = Blueprint('users', __name__)


channel = grpc.insecure_channel('localhost:' + str(50001))
stub = pb2_grpc.UserServiceStub(channel)


@users_blueprint.route('/')
def listUsers():
    message = pb2.UserEmpty()
    response = stub.List(message)
    for user in response.users:
        print(user)
    return 'teste'
