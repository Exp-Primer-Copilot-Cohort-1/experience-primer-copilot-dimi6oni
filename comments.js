// create web server and listen for requests
// 1. create web server object
// 2. create a request handler function
// 3. register the request handler function with the web server object
// 4. start listening for requests

// 1. create web server object
const http = require('http');
const fs = require('fs');

// 2. create a request handler function
const server = http.createServer((request, response) => {
    console.log(request.url);

    if (request.url === '/') {
        fs.readFile('./public/index.html', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        });
    } else if (request.url === '/ninjas') {
        fs.readFile('./public/ninjas.html', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        });
    } else if (request.url === '/dojos/new') {
        fs.readFile('./public/dojos.html', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        });
    } else {
        response.end('File not found!!!');
    }
});

// 3. register the request handler function with the web server object
// 4. start listening for requests
server.listen(6789);
console.log('Running in localhost at port 6789');
