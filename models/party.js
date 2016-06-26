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
module.exports = mongoose.model('party' , partySchema);