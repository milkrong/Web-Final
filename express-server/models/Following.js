const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    following_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = Following = mongoose.model('followings', followingSchema);