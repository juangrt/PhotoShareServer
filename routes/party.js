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
    filename: function (req, file, callback) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        callback(null, raw.toString('hex') + path.extname(file.originalname))
      });
      
    }
});

var headerUpload = multer({ storage: storage , limits: {fileSize: 16000000 }});
var middleware = headerUpload.single('headerImage');
var mediaware = headerUpload.single('mediaFile');

router.get('/', function(req, res, next) {
  //Add Pagination
  Party.find({}, {}, { sort: { 'date' : -1 } }).limit(10).exec(function(err , data){
    if(err){
      res.status(500).send(err);
    }else {
      res.json(data);
    } 
  });
});

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

router.get('/:slug/feed',function(req, res, next){
  Party.findBySlug(req.params.slug , function(err , data){
    if(err){
      res.status(500).send(err);
    } else if (!data) {
      res.status(404).send(err);
    } else {
      Party.mediaFeed(data, function(err, data){
        res.json(data);
      })
    }
  });
});

router.get('/:slug/headerImage',function(req, res, next){
  Party.findBySlug(req.params.slug , function(err , data){
    if(err){
      res.status(500).send(err);
    } else if (!data) {
      res.status(404).send(err);
    } else {
      data.sendHeaderImageFile(res);
    }
  });
});

router.post('/:slug/add',function(req, res, next){
  Party.findBySlug(req.params.slug , function(err , data){
    if(err){
      res.status(500).send(err);
    } else if (!data) {
      res.status(404).send(err);
    } else {
      mediaware(req, res, function(err){
        var media = new Media({party: data});
        
        if(req.file.path){
          media.image.data = fs.readFileSync(req.file.path);
          media.image.contentType = req.file.mimetype;
        }

        if(req.body.comment){
          media.comments = [req.body.comment]
        }

        media.save(function(err){
          if(err){
            res.status(400).send(err);
          } else {
            res.json(media);
          }
        });
        
      });
      
    }
  });
});

module.exports = router;


