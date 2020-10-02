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
          },
          //soment post api
          method: 'POST',
          // sucesso sem dados na resposta da requisicao
          optionsSuccessStatus: 203
      };

module.exports = function(app){
    app.options('/nist/search', cors(Options));
    app.post('/nist/search', cors(corsOptions), search);
}
