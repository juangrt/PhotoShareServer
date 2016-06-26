var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var partySchema = Schema({
	'title': {type: String , require: true},
	'slug': {type: String, require:true, unique:true},
	date: {type: Date , default: Date.now },
  'headerImage': { data: Buffer, contentType: String },
	'meta': {
		'private': {type: Boolean , default: false}
	}
});

partySchema.plugin(uniqueValidator);

partySchema.statics.findBySlug = function (slug, callback) {
  return this.findOne({ slug: slug }, callback);
}

partySchema.methods.sendHeaderImageFile = function (res) {
  if(this.headerImage) {
    res.contentType(this.headerImage.contentType);
    res.send(this.headerImage.data);
  } else {
    res.status(404).send(err);
  }
};

module.exports = mongoose.model('party' , partySchema);