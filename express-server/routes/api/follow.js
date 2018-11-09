const express = require("express");
const router = express.Router();
const passport = require("passport");

const Follower = require("../../models/Follower");
const Following = require("../../models/Following");
const User = require("../../models/User");

// Get followers by user id, the user Id is stored in the token form request(req.user.id)
router.get("/followers", passport.authenticate("jwt", {session: false}), (req, res) => {
    Follower.findById(req.user.id)
        .then(followers => {
            User.findById(followers.follower_id)
                .then(follower_profile => {
                    res.json({
                        id: follower_profile.id,
                        name: follower_profile.name,
                        username: follower_profile.username,
                        motto: follower_profile.motto,
                        avatar: follower_profile.avatar,
                    })
                })
            });
})

// Get followings from From user id in the token
router.get("/followings", passport.authenticate("jwt", {session: false}), (req, res) => {
    Following.findById(req.user.id)
        .then(followings => {
            User.findById(followings.follower_id)
                .then(following_profile => {
                    res.json({
                        id: following_profile.id,
                        name: following_profile.name,
                        username: following_profile.username,
                        motto: following_profile.motto,
                        avatar: following_profile.avatar,
                    })
                })
            });
});

// post following request, and save the user id and follower id and following id like this, 
// we need to save to Follwer and Follwing both
router.post("/following", passport.authenticate("jwt", {session: false}), (req,res) => {
    const followingStatement =  {};
    const followerStatement = {};
    followingStatement.user_id = req.user.id;
    followingStatement.following_id = req.body.id;
    followerStatement.user_id = req.body.id;
    followerStatement.follower_id = req.user.id;

    new Following(followingStatement).save().then(() => {
        res.json({msg: "success"});
    })

    new Follower(followerStatement).save().then(() => {
        res.json({msg: "Success"});
    })
})

// post request to delte from Follower and Following both.
router.post("/unfollowing", passport.authenticate("jwt", {session: false}), (req, res) => {

})

module.exports = router;