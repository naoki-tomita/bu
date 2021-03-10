SCRIPT_DIR=$(cd $(dirname $0) && pwd)
docker run --rm --name hatebu -v $SCRIPT_DIR/data:/docker-entrypoint-initdb.d -e POSTGRES_PASSWORD=hatebu -p 5432:5432 postgres:alpine
