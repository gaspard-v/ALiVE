const express = require('express');

const app = express();

app.get('/api', (req, res) => {
    res.send('ALiVE api is running.');
});

app.post('/api/objet', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});

app.listen(3000, () => console.log('ALiVE app server is listening on port 3000.'));
