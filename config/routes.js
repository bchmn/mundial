//module dependencies
var express = require('express'),
    env = process.env.NODE_ENV || 'development',
    path = require('path')
    fs = require('fs'),
    slides = require('../controllers/slides');

var session = require('express-session');

module.exports = function(app, config) {
    var db = require('mongoskin').db(config.app.db);

    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

    //static files served from /public
    app.use(express.static(path.join(__dirname, '/../public')));    
    if (env === 'production') {
        console.log("MOUNTING /uploads to /slides");
        app.use('/slides', express.static(path.join(__dirname, '/../uploads')));
    }

    // root
    app.get('/', function(req, res) {
        res.render('index');
    });

    //create slide
    app.post('/create_slide', slides.create);
    //display slide
    app.get('/slide', function (req, res) { res.redirect('/') });
    app.get('/slide/', function (req, res) { res.redirect('/') });
    app.get('/slide/:id', slides.get);
    app.get('/slides', checkAuth, slides.gallery);

    function checkAuth(req, res, next) {
      if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
      } else {
        next();
      }
    }

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res) {
      var post = req.body;
      if (post.user === 'johnny' && post.password === 'meteor') {
        req.session.user_id = '1';
        res.redirect('/slides');
      } else {
        res.send('Bad user/pass');
      }
    });

};
