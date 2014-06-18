// module dependencies
var express = require('express'),
    http = require('http'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/environments')[env];

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
