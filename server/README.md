Requires rimraf and typescript to be globally installed
    npm install typescript -g 
    npm install rimraf -g

Then can be ran with
    npm start


=================Docker install==============
    docker build -t hdark:cake-be .
    docker run -it  --rm   -v ${PWD}:/app  -v /app/node_modules  -p 3001:3001  -e CHOKIDAR_USEPOLLING=true  hdark:cake-be 