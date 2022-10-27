const http = require('http');
const https = require('https');

const server = http.createServer(function (req, res) {
    res.statusCode = 200; // 200 = OK
    res.setHeader('Content-Type', 'text/html');
    res.write("<h1>ALiVE Demo back</h1>");

    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/api/objet' && req.method === 'PUT') {
        var ipAddr = extractIPAddress(parsedUrl.pathname);

        if(!ipAddr.length) {
            res.statusCode = 400;
            res.end("Invalid IP Address");
        } else {
            handleUpdate(ipAddr,res);
        }
    }

    res.end();
});

server.listen(3000, function () {
    console.log("Listening on port http://localhost:3000");
});
