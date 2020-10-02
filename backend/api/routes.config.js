'use strict';

const search = require('./controllers/search'),
      cors = require('cors'),
      whitelist = [process.env.HOST_IP],
      corsOptions = {
          origin: function(origin, callback){
              if (whitelist.indexOf(origin) !== -1){
                  callback(false, true)
              }
              else
                callback(new Error('IP não autorizado'))
          }
      };

module.exports = function(app){
    app.post('/nist/search', cors(corsOptions), search);
}
