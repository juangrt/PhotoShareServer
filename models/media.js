var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mediaSchema = Schema({
	image: Buffer,
	tags: [String],
	approved: { type: Boolean , default: true},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	party: {
		type: userTypes.ObjectId,
		ref: 'party'
	}
});


module.exports = mongoose.model('media' , mediaSchema);