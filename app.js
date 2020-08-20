const express = require('express'),
      app = express(),
      port = process.env.port || 8080,
      routes = require('./api/routes.config');
      path = require('path'),
      bodyParser = require('body-parser');
  
app.use(bodyParser.json());

routes(app);

app.use(express.static(path.join(__dirname, '/views')));

app.listen(port, '127.0.0.1');


// router.get('/login', function(req, res, next) {
//         res.render('./views/login');
// });