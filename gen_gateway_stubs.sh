#!/bin/bash
docker run --rm -v $(pwd):$(pwd) -w $(pwd) znly/protoc --plugin=protoc-gen-grpc=/usr/bin/grpc_python_plugin --python_out=./gateway/stubs/users/  --grpc_out=./gateway/stubs/users/  --proto_path=./shared/protos/ ./shared/protos/user.proto

docker run --rm -v $(pwd):$(pwd) -w $(pwd) znly/protoc --plugin=protoc-gen-grpc=/usr/bin/grpc_python_plugin --python_out=./gateway/stubs/books/  --grpc_out=./gateway/stubs/books/  --proto_path=./shared/protos/ ./shared/protos/book.proto

docker run --rm -v $(pwd):$(pwd) -w $(pwd) znly/protoc --plugin=protoc-gen-grpc=/usr/bin/grpc_python_plugin --python_out=./gateway/stubs/reads/  --grpc_out=./gateway/stubs/reads/  --proto_path=./shared/protos/ ./shared/protos/read.proto