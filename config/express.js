// module dependencies
var express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    errorhandler = require('errorhandler');

module.exports = function (app, config) {
    app.set('port', config.app.port);
    app.use(favicon(__dirname + '/../public/images/favicon.ico'));
    app.use(logger());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(require('connect-multiparty')());
    app.use(cookieParser('d1A76YqsMksz6Mf5mTJI1b530EXjP87d'));

    //specific environments
    switch (app.get('env')) {
        case 'production':
            app.use(errorhandler());
            break;
        case 'staging':
            break;
        default:
            app.use(errorhandler({
                dumpExceptions: true,
                showStack: true
            }));
    }

}
