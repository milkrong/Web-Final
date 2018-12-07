const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    follower_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = Follower = mongoose.model('followers',followerSchema);