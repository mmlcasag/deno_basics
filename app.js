// this is the equivalent in nodejs
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World (from NodeJs)');
});

server.listen(3000);