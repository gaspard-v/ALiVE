const express = require('express');

const app = express();

app.get('/api', (req, res) => {
    res.send('ALiVE api is running.');
});

app.get('/api/object/1', function(req, res, next){
    res.render('index'), {title: 'cool', condition: true, array: [1, 2, 3]};
});

app.post('/api/objet/create', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});

app.listen(8080, () => console.log('ALiVE app server is listening on port 8080.'));
