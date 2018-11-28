const express = require("express");
const router = express.Router();
const passport = require("passport");

const Follower = require("../../models/Follower");
const Following = require("../../models/Following");
const User = require("../../models/User");

// Get followers by user id, the user Id is stored in the token form request(req.user.id)
router.get("/followers/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Follower.find({user_id:req.params.id})
        .then(followers => {
            if (followers.length < 1) {
                res.status(400).json("No followers")
            }
            console.log(followers)
            follower_ids = []
            followers.forEach((follower, i) => {
                follower_ids.push(follower.follower_id)
            })
            User.find({
                _id: { $in: follower_ids}
            }).select('-hash_password')
            .then(users => {
                res.json(users)
            });
            
        })
        .catch(err=> {
            res.status(500).json("Something Wrong")
        });
})

// Get followings from From user id in the token
router.get("/followings/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Following.find({user_id:req.params.id})
        .then(followings => {
            if (followings.length < 1) {
                res.status(400).json("No followings")
            }
            following_ids = []
            followings.forEach((following, i) => {
                following_ids.push(following.following_id)
            })
            User.find({
                _id: { $in: following_ids}
            }).select('-hash_password')
            .then(users => {
                res.json(users)
            });
            
        })
        .catch(err=> {
            res.status(500).json("Something Wrong")
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

    User.findByIdAndUpdate(req.user.id, {$inc: {following_number: 1}}, function (err, user) {
        if(err) {
            console.log(err)
            res.status(500).json('Something went wrong')
        }
        User.findByIdAndUpdate(req.body.id, {$inc: {following_number: 1}}, function (err, user) {
            if(err) {
                console.log(err)
                res.status(500).json('Something went wrong')
            }
            res.json('Success')
        })
    })
})

// post request to delte from Follower and Following both.
router.post("/unfollowing", passport.authenticate("jwt", {session: false}), (req, res) => {

})

module.exports = router;