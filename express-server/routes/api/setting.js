const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/User')

router.post('/account', (req,res) => {
    const email = req.body.email
    const username = req.body.username

    User.findOne({email})
        .then(user => {
            if(user) {
                res.status(400).json("Email already used!")
            } else {
                User.findById(req.body.id)
                .then(user => {
                    if(!user) {
                        res.status(404).json('Please Try Again, UserID not exist')
                    } else {
                        user.email = req.body.email
                        user.username = req.body.username

                        user.save()
                            .then(user => {
                                res.json('Changes Saved')
                            })
                            .catch(err => {
                                console.log(err)
                                res.json('Error!')
                            })
                    }
                })
            }
        })
})

module.exports = router