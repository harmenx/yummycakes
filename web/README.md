To start the front-end, first run 
    npm install
Then
    npm start

=================Docker install==============
    docker build -t hdark:cake-fe .
    docker run -it  --rm -v ${PWD}:/app  -v /app/node_modules  -p 3000:3000  -e CHOKIDAR_USEPOLLING=true  hdark:cake-fe 