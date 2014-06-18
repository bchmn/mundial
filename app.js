// module dependencies
var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/environments')[env],
    utils = require('./config/utils');

var app = express();
// express settings
require('./config/express')(app, config);

// bootstrap routes
require('./config/routes')(app);

// web connection
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// expose app
exports = module.exports = app
