const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Friend = require("../../models/Friend");

router.get("/search/:username", passport.authenticate("jwt", {session: false}), (req,res) => {
    User.find({'username': { '$regex' : req.params.username, '$options' : 'i' }}).select('-hash_password')
        .then(users => {
            if(!users) {
                res.status(400).json('No user found')
            } else {
                users.forEach((user, i) => {
                    Friend.find({user_id: user._id, follower_id: req.user.id})
                    .exec((err, followers) => {
                        if (followers) {
                            user.isfriend = true
                        } else {
                            user.isfriend = false
                        }
                    })
                });
                res.json(users)
            }
        })
        .catch(err => {
            res.status(400).json('No user found')
            console.log(err)
        });
});

module.exports = router;