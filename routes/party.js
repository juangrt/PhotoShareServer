var fs = require('fs');
var crypto = require('crypto');
var path = require('path');

var express = require('express');
var router = express.Router();
var Party = require('../models/party.js');
var Media = require('../models/media.js');

var multer  = require('multer');
var storage = multer.diskStorage(
  {
  destination: './temp/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      });
      
    }
});

var headerUpload = multer({ storage: storage , limits: {fileSize: 16000000 }});
var middleware = headerUpload.single('headerImage');

router.post('/new', function(req, res, next) {
  middleware(req , res, function(err){
    var party = new Party(req.body);

    //Save headerImage if one was chosen
    if(req.file.path){
      party.headerImage.data = fs.readFileSync(req.file.path);
      party.headerImage.contentType = req.file.mimetype;
    }

    party.save(function (err){
      if (err) {
        res.status(400).send(err);
      } 
      else {
        res.json(party);
      }
    });
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

router.get('/:slug/headerImage',function(req, res, next){
  Party.findOne({slug: req.params.slug}).exec(function(err , data){
    if(err){
      res.status(500).send(err);
    } else if (!data) {
      res.status(404).send(err);
    }else {
      //Add logic to send generic image in its place.
      if(data.headerImage) {
        res.contentType(data.headerImage.contentType);
        res.send(data.headerImage.data);
      } else {
        res.status(404).send(err);
      }
    } 
  });
});

router.post('/:slug/add',function(req, res, next){
  Party.findOne({slug: req.params.slug}).exec(function(err , data){
    if(err){
      res.status(500).send(err);
    } else if (!data) {
      res.status(404).send(err);
    }else {
      var media = new Media();
      //res.json(data);
    } 
  });
});

module.exports = router;


