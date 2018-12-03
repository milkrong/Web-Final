const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Friend = require("../../models/Friend");

router.get("/friends/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Friend.find({user_id:req.params.id})
        .then(friends => {
            if (friends.length < 1) {
                res.status(400).json("No friends")
            }
            console.log(friends)
            friend_ids = []
            friends.forEach((friend, i) => {
                friend_ids.push(friend.friend_id)
            })
            User.find({
                _id: { $in: friend_ids}
            }).select('-hash_password')
            .then(users => {
                res.json(users)
            });
            
        })
        .catch(err=> {
            console.log(err)
            res.status(500).json("Something Wrong")
        });
})

router.get("/isfriend/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Friend.find({user_id: req.user.id, friend_id: req.params.id})
        .then(friend => {
            if(friend.length < 1) {
                res.json({isfriend: false})
            } else {
                res.json({isfriend: true})
            }
        })
        .catch(err => {
            console.log(err)
            res.json("Something wrong")
        })
})

router.post("/add", passport.authenticate("jwt", {session: false}), (req, res) => {
    const newFriend = {
        user_id: req.user.id,
        friend_id: req.body._id
    }

    new Friend(newFriend).save().then(() => {
        res.json("Add Sccuess")
    }).catch(err => {
        console.log(err)
        res.status(500).json('Adding Failed')
    })
})

router.post("/delete", passport.authenticate("jwt", {session: false}), (req, res) => {
    Friend.deleteOne({user_id: req.user.id, friend_id: req.body._id})
        .then(() => {
            res.json('Delete Success')
        })
        .catch(err => {
            res.status(500).json('Delete Failed')
        })
})

module.exports = router;