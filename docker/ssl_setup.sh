apt-get update
apt-get upgrade

cd ../docker/

docker-compose down -v
docker-compose up -d

echo "Hello"