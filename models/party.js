var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var partySchema = Schema({
	'title': {type: String , require: true},
	slug: {type: String, require:true, unique:true}, //PartyId
	date: {type: Date , default: Date.now },
	meta: {
		private: {type: Boolean , default: false}
	}
});

partySchema.plugin(uniqueValidator);
module.exports = mongoose.model('party' , partySchema);