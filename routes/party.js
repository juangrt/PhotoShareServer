var express = require('express');
var router = express.Router();
var Party = require('../models/party.js');
var Media = require('../models/media.js');

var multer  = require('multer');
var upload = multer();

router.post('/create', upload.array() ,function(req, res, next) {
  var party = new Party(req.body);

	party.save(function (err){
    if (err) {
      res.status(400).send(err);
		} 
    else {
      res.json(party);
    }
	});
});

router.get('/', function(req, res, next) {
  //Add Pagination
  Party.find().limit(10).exec(function(err , data){

    if(err){
      res.status(500).send(err);
    }else {
      res.json(data);
    } 
  });
});

router.post('/:slug/add', function(req, res, next){
  Party.find(req.params.slug).exec(function(err , data){
    if(err){
      res.status(500).send(err);
    }else {
      res.json(data);
    } 
  });
  //find slug
  //attempt save
  //respond with new media obj
});

module.exports = router;


