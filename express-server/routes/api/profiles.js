const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Follower = require("../../models/Follower");

//  $router /api/profiles/
router.get("/info/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    User.findById(req.params.id)
        .select('-hash_password')
        .then(user => {
            if(!user) {
                res.status(400).json('Somethin wrong in the server')
            } else {
                res.json(user)
            }
        })
})

router.get("/search/:username", passport.authenticate("jwt", {session: false}), (req,res) => {
    User.find({'username': { '$regex' : req.params.username, '$options' : 'i' }}).select('-hash_password')
        .then(users => {
            if(!users) {
                res.status(400).json('No user found')
            } else {
                users.forEach((user, i) => {
                    Follower.find({user_id: user._id, follower_id: req.user.id})
                    .exec((err, followers) => {
                        if (followers) {
                            user.isfollowing = true
                        } else {
                            user.isfollowing = false
                        }
                    })
                });
                res.json(users)
            }
        })
        .catch(err => {
            res.status(400).json('No user found')
            console.log(err)
        })
})

module.exports = router; 