 const express = require("express");
 const router = express.Router();
 const passport = require("passport");

 const User = require("../../models/User");

//  $router /api/profiles/
router.get("/info", passport.authenticate("jwt", {session: false}), (req, res) => {
    User.findById(req.body.id)
        .then(user => {
            if(!user) {
                res.status(400).json('Somethin wrong in the server')
            } else {
                res.json({
                    id : user._id,
                    name: user.name,
                    motto: user.motto,
                    hobbies: user.hobbies,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                    created_at: user.created_at
                })
            }

        })
})

module.exports = router; 