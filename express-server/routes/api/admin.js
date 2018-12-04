const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const key = require("../../config/key");
const passport = require('passport');
const admin = require('../../config/admin');

const User = require("../../models/User");
const Feed = require("../../models/Feed");

// $router POST /api/user/register
router.post("/register", (req, res) => {
    // Check existing email 
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(user) {
                return res.status(400).json("Email already been used");
            } else {
                // store user in newUser object
                const avatar = gravatar.url(req.body.email, {s: '64', r: 'pg', d:'mm'}); 
                const newUser = new User({
                    email: req.body.email,
                    avatar,
                    hash_password: req.body.password,
                    isAdmin: true
                });
                // hash the password and store
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.hash_password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err) throw err;
                        
                        newUser.hash_password = hash;
                        newUser.save()
                            .then(user => res.json({
                                id: user._id
                            }))
                            .catch(err => {
                                console.log(err)
                                res.json('Register Failed')
                            });
                    });
                });
            }
        })
});

// $router Post /api/user/login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json('User is not exist')
            }

            // Load hash from your password DB.
            bcrypt.compare(password , user.hash_password)
                .then(isMatch =>  {
                    if(isMatch) {
                        const rule = {id:user.id, email: user.email, avatar: user.avatar, isAdmin: user.isAdmin};
                        jwt.sign(rule, key.secretKey, {expiresIn: 7200}, (err, token) => {
                            if(err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return res.status(400).json("Password is not correct");
                    }
                });
        });
})

//$router /api/user/current
router.get("/current", [passport.authenticate("jwt", {session: false}), admin], (req, res) => {
    res.json({
        id: req.admin.id,
        email: req.admin.email,
        avatar: req.admin.avatar,
        admin: req.admin.isAdmin
    });
}) 

router.get("/alluser", passport.authenticate("jwt", {session: false}), (req, res) => {
    User.find({}, ['name', 'username', 'email', 'created_at'])
        .then(users => {
            res.json(users)
        })
})

module.exports = router;