const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
	role: {
		type: String,
		required: true,
	},
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	stud_of: {
		type: String,
	},
	guar_of: {
		type: String,
	},
	otp: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);