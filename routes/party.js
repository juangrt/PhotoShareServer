const crypto = require('crypto');
var express = require('express');
var router = express.Router();
var Party = require('../models/party.js');

var path = require('path');
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
var upload = multer({ storage: storage , limits: {fileSize: 16000000 }});
 
var createMiddleware = upload.single('mediaFile');


//Create Party
router.post('/create' ,function(req, res, next) {

	createMiddleware(req , res, function(err){
		//console.dir(req.file);
		console.dir(req.body);
		//console.dir(err);
		res.send(req.body);

	});
});

router.get('/:id', function(req, res, next) {
  res.send('Hello Juan!: ' + req.params.id );
});

//Add Image or Video
router.get('/:id/add', function(req, res, next) {
  res.send('Hello Juan!');
});

router.post('/create', function(req, res, next) {
  res.send('Hello Juan!');
});

router

module.exports = router;


