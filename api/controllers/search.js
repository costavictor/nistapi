'use strict';

const nistapi = require('../../requests/request');

module.exports = function(req, res){
    let body = JSON.parse(JSON.stringify(req.body));

    nistapi.getbyname(body.name, body.page)
            .then((d) =>{
                res.json(d);
                res.end();
            });
}