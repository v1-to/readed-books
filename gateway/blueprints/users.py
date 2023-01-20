import stubs.user_pb2_grpc as pb2_grpc
import stubs.user_pb2 as pb2
from flask import Blueprint, jsonify, request
import grpc

HOST, PORT = '127.0.0.1', 50001
users_blueprint = Blueprint('users', __name__)
channel = grpc.insecure_channel('localhost:' + str(50001))
stub = pb2_grpc.UserServiceStub(channel)


class User():
    def __init__(self, id, name, gender):
        self.id = id
        self.name = name
        self.gender = gender

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender
        }


@users_blueprint.route('/', methods=['POST'])
def create_user():
    message = pb2.User(**request.json)
    stub.Create(message)
    return jsonify({})


@users_blueprint.route('/', methods=['GET'])
def list_users():
    message = pb2.UserEmpty()
    response = stub.List(message)
    arr = []
    for user in response.users:
        arr.append(User(user.id, user.name, user.gender).to_dict())
    return jsonify(arr)


@users_blueprint.route('/<int:id>', methods=['GET'])
def read_user(id):
    message = pb2.UserIdentifier(id=id)
    user = stub.Read(message)
    return jsonify(User(user.id, user.name, user.gender).to_dict())


@users_blueprint.route('/', methods=['PUT'])
def update_user():
    message = pb2.User(**request.json)
    stub.Update(message)
    return jsonify({})


@users_blueprint.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    message = pb2.UserIdentifier(id=id)
    stub.Delete(message)
    return jsonify({})
