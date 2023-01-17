#!/bin/bash
python3 -m grpc_tools.protoc --proto_path stubs=shared/protos/ shared/protos/user.proto --python_out=gateway/ --grpc_python_out=gateway/

python3 -m grpc_tools.protoc --proto_path=./shared/protos/ ./shared/protos/book.proto --python_out=./gateway/stubs/ --grpc_python_out=./gateway/stubs/

python3 -m grpc_tools.protoc --proto_path=./shared/protos/ ./shared/protos/read.proto --python_out=./gateway/stubs/ --grpc_python_out=./gateway/stubs/