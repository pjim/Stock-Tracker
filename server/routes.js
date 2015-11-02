/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var request = require('request')

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.post('/stockCall',function(req,res){
    var stockObjects = req.body.stockOb;
    console.log( 'this is stock objec from the request' + stockObjects);
    request('http://dev.markitondemand.com/Api/v2/InteractiveChart/json?parameters=' + stockObjects,function(error,response,body){
      console.log('call to markit');
       console.log(body)  ;
       res.json(body);
    })  ;
  });
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
