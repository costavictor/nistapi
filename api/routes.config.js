'use strict';

const path = require('path'),
      search = require('./controllers/search');

let views = path.join(__dirname, '../views/html');

module.exports = function(app){
    app.get('/', function(req, res, next) {
        res.sendFile(path.join(views, '/index.html'));
    });

    app.get('/linux', function(req, res, next) {
        res.sendFile(path.join(views, '/linux.html'));
    });

    app.get('/webserver', function(req, res, next) {
        res.sendFile(path.join(views, '/webserver.html'));
    });

    app.get('/bancodedados', function(req, res, next) {
        res.sendFile(path.join(views, '/databases.html'));
    });

    app.post('/nist/search', search);

}
