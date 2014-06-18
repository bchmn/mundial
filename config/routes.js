//module dependencies
var express = require('express'),
    path = require('path')
    fs = require('fs');

module.exports = function(app) {
    app.use(express.static(path.join(__dirname, '/../public')));

    app.get('/', function(req, res) {
        res.sendfile('index.html', {'root': __dirname + '/../public/'});
    });

    app.post('/save_image', function(req, res) {
      if (!req.body || !req.body.hasOwnProperty('image_data_uri')) {
        console.error('missing image_data_uri');
        res.send({ error: true , message: 'missing image_data_uri' });
      }
      else {
          var dataUri = req.body.image_data_uri;
          var matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

          if (matches.length !== 3) {
            console.error('invalid image_data_uri');
            res.send({ error: true , message: 'invalid image_data_uri' });
          }
          else {
              var imageFileName = new Date().getTime() + '.jpg';
              fs.writeFile(__dirname + '/../public/slides/' + imageFileName , new Buffer(matches[2], 'base64'), function(err) {
                 if (err) {
                   console.error(err);
                   res.send({ error: true , message: 'error writing image' });
                 }
                 else
                   res.send({error: false, image_url: req.protocol + '://' + req.get('host') + '/slides/' + imageFileName});
              });
          }
      }
    });
};
