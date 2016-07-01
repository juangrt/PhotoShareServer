var express = require('express');
var router = express.Router();
var Media = require('../models/media.js');


router.get('/:id', function(req, res, next) {

  Media.findById(req.params.id).populate('party').exec(function(err, data){
    if(err){
      res.status(500).send(err);
    }else {
      res.json(data.populate('party'));
    } 
  });

});

router.get('/:id/image', function(req, res, next) {
  Media.findById(req.params.id , function(err , data){
    if(err){
      res.status(500).send(err);
    } else if (!data) {
      res.status(404).send(err);
    } else {
      data.sendImageFile(res);
    }
  });
});

//Add Comment
router.get('/:id/update', function(req, res, next) {

});


module.exports = router;


