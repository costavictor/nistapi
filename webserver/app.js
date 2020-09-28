const express = require('express'),
      app = express(),
      port = process.env.port || 8090,
      routes = require('./api/routes.config');
      path = require('path'),
      bodyParser = require('body-parser');
  
app.use(bodyParser.json());

routes(app);

app.use(express.static(path.join(__dirname, '/views')));

app.listen(port);
