const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require("bcrypt")
const key = require('../../config/key')

const fs = require('fs');
// 初始化Client
const co = require('co');
const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-us-east-1',
  accessKeyId: 'LTAILigyC99J4gV0',
  accessKeySecret: key.osskey
});

const ali_oss = {
    bucket: 'postifymusic',
    endPoint: 'oss-us-east-1.aliyuncs.com',
}

var multer  = require('multer')
var upload = multer({ dest: './tmp/' })

const User = require('../../models/User')

router.post('/account', passport.authenticate("jwt", {session: false} ), (req,res) => {
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
})

//  Check password and save
router.post('/password', passport.authenticate("jwt", {session: false} ), (req, res) => {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const userId = req.body.id

    User.findById(userId)
        .then(user => {
            if(!user) {
                res.status(400).json('User not found')
            }

            bcrypt.compare(oldPassword, user.hash_password)
                .then(isMatch => {
                    if (isMatch) {
                        
                        user.has_password = newPassword
                        // hash the password and store
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(user.hash_password, salt, (err, hash) => {
                                // Store hash in your password DB.
                                if(err) throw err;
                                
                                user.hash_password = hash;
                                user.save()
                                    .then(user => res.json('Changes saved'))
                                    .catch(err => {
                                        console.log(err)
                                        res.json('Password changes Failed')
                                    })
                            });
                        });
                    } else {
                        res.status(400).json('Password not right')
                    }
                })
        })
})

router.post('/upload', upload.single('avatar'), (req, res) => {
    const filePath = './' + req.file.path
    console.log(req.file)
    const fileType = req.file.originalname.split('.').pop()
    const fileName = Date.now() + 'avatar.' + fileType
    
    fs.rename(filePath, fileName, (err) => {
        if (err) {
            res.status(102).json('File Save Failed')        
        } else {
            const localFile = './' + fileName
            const key = 'avatar/' + fileName

            co(function* () {
                client.useBucket(ali_oss.bucket)
                const result = yield client.put(key, localFile)

                const imgSrc = 'http://postifymusic.oss-us-east-1.aliyuncs.com/'+ result.name
                fs.unlinkSync(localFile)
                res.json({msg: 'Success', avatar: imgSrc})
            }).catch(err => {
                fs.unlinkSync(localFile)
                res.json('Failed while uploading')
            })
        }
    })
})

router.post('/user', passport.authenticate("jwt", {session: false} ), (req, res) => {
    // console.log(req.body)
    const newUser = req.body
    User.findById(newUser.id)
        .then(user => {
            if(!user) {
                res.status(400).json('User not exist')
            } else {
                user.avatar  = newUser.avatar
                user.motto = newUser.motto
                user.hobbies = newUser.hobbies

                user.save()
                    .then(user => {
                        res.json('Change Saved')
                    })
                    .catch(err => {
                        res.status(400).json('Failed')
                    })
            }
        })
})

module.exports = router