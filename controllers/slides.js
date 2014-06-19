var env = process.env.NODE_ENV || 'development',
	config = require('../config/environments')[env],
	guid = require('guid');
	//db = require('mongoskin').db(config.app.db);

exports.create = function(req, res) {
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
              var slideId = guid.raw();
	          console.log('creating slide ' + slideId);
	          var imageFileName = slideId + '.jpg';
	          fs.writeFile(__dirname + '/../public/slides/' + imageFileName , new Buffer(matches[2], 'base64'), function(err) {
	           if (err) {
	             db.collection('slides').remove({_id: slideId});
	             console.error(err);
	             res.send({ error: true , message: 'error writing image' });
	           }
	           else {
	              var slideURL = req.protocol + '://' + req.get('host') + '/slides/' + imageFileName;
	              res.send({error: false, image_url: slideURL });                      
	           }
	        });	
          }
      }
};