echo "Deploying files to server...."

scp -r ./* root@195.231.84.29:/root/protexnotificationcenter/api/

echo "Done!"