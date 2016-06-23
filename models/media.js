var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mediaSchema = Schema({
	image: Buffer,
	tags: [String],
	comments: [String],
	approved: { type: Boolean , default: true },
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	party: {
		type: Schema.Types.ObjectId,
		ref: 'party'
	}
});


module.exports = mongoose.model('media' , mediaSchema);