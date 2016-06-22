var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var partySchema = Schema({
	moderator: [{
		type: Schema.Types.ObjectId,
		ref: 'users'
	}],
	media: [{
		type: Schema.Types.ObjectId,
		ref: 'media'
	}],
	date: {type: Date , default: Date.now },
	meta: {
		private: {type: Boolean , default: false}
	}
});


module.exports = mongoose.model('party' , partySchema);