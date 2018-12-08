const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socketSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	socketInfo: {
		type: String,
	}
});

module.exports = mongoose.model('sockets', socketSchema);

