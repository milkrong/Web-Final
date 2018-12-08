const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRecordsSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	friend_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	message:  String,
	sendOrRecv: {
		type: String,
		required: true
	},
	timeStp: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('chatRecords', chatRecordsSchema);
