cd ../docker/

docker-compose down -v
docker-compose up -d

docker-compose logs -f -t nistapi