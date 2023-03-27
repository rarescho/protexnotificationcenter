echo "Swithcing to branch master" 
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server...."

scp -r build/*  root@195.231.84.29:/var/www/www.protex-dashboard.it/

echo "Done!"