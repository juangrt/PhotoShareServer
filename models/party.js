var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Media = require('../models/media.js');

var partySchema = Schema({
  'title': {type: String , required: true},
  'slug': {type: String, required:true, unique:true},
  date: {type: Date , default: Date.now },
  'headerImage': { data: Buffer, contentType: String },
	'meta': {
		'private': {type: Boolean , default: false}
	}
});


partySchema.statics.findBySlug = function (slug, callback) {
  return this.findOne({ slug: slug }, callback);
}

partySchema.statics.mediaFeed = function (party, callback) {
  return Media.find({party: party} , callback);
}

partySchema.methods.sendHeaderImageFile = function (res) {
  if(this.headerImage.data) {
    res.contentType(this.headerImage.contentType);
    res.send(this.headerImage.data);
  } else {
    res.status(404).send({error: "Not Found"});
  }
};

if (!partySchema.options.toJSON) {
  partySchema.options.toJSON = {};
  partySchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.headerImage;
  delete ret._id;
  delete ret.__v;
  }
}

module.exports = mongoose.model('party' , partySchema);