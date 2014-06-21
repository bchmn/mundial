//module dependencies
var express = require('express'),
    path = require('path')
    fs = require('fs'),
    slides = require('../controllers/slides');

module.exports = function(app, config) {
    var db = require('mongoskin').db(config.app.db);

    //static files served from /public
    app.use(express.static(path.join(__dirname, '/../public')));

    // root
    app.get('/', function(req, res) {
        res.sendfile('index.html', {'root': __dirname + '/../public/'});
    });

    //create slide
    app.post('/create_slide', slides.create);
    //display slide
    app.get('/slide/', function (req, res) { res.redirect('/') });
    app.get('/slide/:id', slides.get);
};
