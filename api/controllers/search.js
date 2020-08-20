'use strict';

const nistapi = require('../../requests/request');

module.exports = function(req, res){
    let body = JSON.parse(JSON.stringify(req.body));

    console.log(body);

    nistapi.getbyname('fortinet')
            .then((d) =>{
                res.json(d);
                res.end();
            });
}