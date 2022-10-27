const http = require('http');

const server = http.createServer(function (req, res) {
    res.statusCode = 200; // 200 = OK
    res.setHeader('Content-Type', 'text/html');
    res.write("<h1>Demo page</h1>");
    res.end();
});

server.listen(3000, function () {
    console.log("Listening on port http://localhost:3000");
});
