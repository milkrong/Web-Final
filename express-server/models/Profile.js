const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    background: {
        type: String
    },
    feed_id: {
        type: Schema.Types.ObjectId,
        ref: "feeds"
    },
    follower_id: {
        type: Schema.Types.ObjectId,
        ref: "followers"
    },
    following_id: {
        type: Schema.Types.ObjectId,
        ref: "followings"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model("profiles", profileSchema);