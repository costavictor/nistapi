'use strict';

const path = require('path'),
      search = require('./controllers/search');

let views = path.join(__dirname, '../views/html');

module.exports = function(app){
    app.post('/nist/search', search);

}
