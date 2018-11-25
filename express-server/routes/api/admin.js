const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const key = require("../../config/key");
const passport = require('passport');

const Admin = require("../../models/Admin");

// $router POST /api/user/register
router.post("/register", (req, res) => {
    // Check existing email 
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if(admin) {
                return res.status(400).json("Email already been used");
            } else {
                // store user in newUser object
                const avatar = gravatar.url(req.body.email, {s: '64', r: 'pg', d:'mm'}); 
                const newAdmin = new Admin({
                    email: req.body.email,
                    avatar,
                    hash_password: req.body.password
                });
                // hash the password and store
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newAdmin.hash_password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err) throw err;
                        
                        newAdmin.hash_password = hash;
                        newAdmin.save()
                            .then(admin => res.json({
                                id: admin._id
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
    Admin.findOne({email})
        .then(admin => {
            if(!admin){
                return res.status(404).json('User is not exist')
            }

            // Load hash from your password DB.
            bcrypt.compare(password , admin.hash_password)
                .then(isMatch =>  {
                    if(isMatch) {
                        const rule = {id:admin.id, email: admin.email, avatar: admin.avatar};
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

//$router /api/admin/current
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
        id: req.admin.id,
        email: req.admin.email,
        avatar: req.admin.avatar,
    });
}) 

module.exports = router;