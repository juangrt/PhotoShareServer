var express = require('express');
var router = express.Router();

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

var upload = multer({ storage: storage , limits: {fileSize: 16000000 }}); //16MB File Limit
var middleware = upload.single('mediaFile');

router.post('/create' ,function(req, res, next) {
	middleware(req , res, function(err){
		console.dir(req.body);
		res.send(req.body);
	});
});


router.post('/upload', function(req, res, next){
	res.send(req);
});

router.get('/:id', function(req, res, next) {
  res.send('Hello ddMedia!: ' + req.params.id );
});

//Add Comment
router.get('/:id/a', function(req, res, next) {
  res.send('Hello Juan!');
});


module.exports = router;


