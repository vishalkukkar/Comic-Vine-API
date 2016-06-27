var async = require('async');
var config = require('../config');
var superagent = require('superagent');


module.exports = function (app) {
  
  app.get('/character/search', function(req, res) {

    superagent
      .get(config.api.base + '/characters')
       .query({api_key: config.api.key })
       .query({filter:'name:'+req.query.name})
        .query({format:'json'})
        .query({limit:5})
      .end(function(err, result) {
        res.json((result.body.results));
        
      });
  });

  app.get('/character/details', function(req, res) {

    superagent
      .get(config.api.base + '/character/4005-' + req.query.id)
      .query({api_key: config.api.key})
      .query({format:'json'})
      .query({field_list:"character_friends,character_enemies,powers,name,deck,origin,publisher,image,id"})

      .end(function(err, result) {
        if (err || result.statusCode !== 200) {
          res.send(err);
        }
        else {
          console.log('///// character detail');
          console.log(result.body.results);
          res.json(result.body.results);
        }
      });
  });

app.get('/character/versus', function(req, res) {
        console.log("REQUEST" +req.query)
    async.parallel({
      mainDetail: function(next) {
        _characterDetails(req.query.main, next);
      },
      challengerDetail: function(next) {
        _characterDetails(req.query.challenger, next);
      }
    }, function done(err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(results);
      }
    });
  });

};

function _characterDetails(id, callback) {
  superagent
    .get(config.api.base + '/character/4005-' + id)
    .query({api_key: config.api.key})
    .query({field_list:"id,character_friends,character_enemies,powers,name,deck,origin,publisher,image,teams"})
    .query({format :'json'})
    .end(function(err, result) {
      callback(err, (result.body.results));
  });


  
};



