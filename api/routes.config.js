'use strict';

const path = require('path'),
      search = require('./controllers/search');

let views = path.join(__dirname, '../views/html');

module.exports = function(app){
    app.get('/', function(req, res, next) {
        res.sendFile(path.join(views, '/index.html'));
    });

    app.get('/nist/search', search);

}
