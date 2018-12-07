const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    friend_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = Friend = mongoose.model('friends', friendSchema);