var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var mediaSchema = Schema({
	date: {type: Date , default: Date.now },
	image: { data: { type: Buffer, required: true },
					contentType: { type: String , required: true}
				},
	tags: [String],
	comments: { type: [String] , default: [] },
	approved: { type: Boolean , default: true },
	//User not implemented yet
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	party: {
		type: Schema.Types.ObjectId,
		ref: 'party',
		required: true
	}
});

if (!mediaSchema.options.toJSON) {
  mediaSchema.options.toJSON = {};
  mediaSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  delete ret.image;
  delete ret._id;
  delete ret.__v;
  }
}

module.exports = mongoose.model('media' , mediaSchema);