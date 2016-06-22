var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = Schema({
	email: String,
	password: String
	lastLogin: {type: Date , default: Date.now } 
});

module.exports = mongoose.model('user' , userSchema);