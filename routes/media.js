var express = require('express');
var router = express.Router();

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


router

module.exports = router;


