const express = require('express'),
      app = express(),
      port = process.env.port || 8090,
      routes = require('./api/routes.config');
      bodyParser = require('body-parser');
  
app.use(bodyParser.json());

routes(app);

app.listen(port);