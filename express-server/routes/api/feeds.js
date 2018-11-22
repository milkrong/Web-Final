const express = require("express");
const router = express.Router();
const passport = require("passport");
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

const Feed = require("../../models/Feed")
const User = require("../../models/User")

router.get("/test", (req, res) => {
    res.json({msg: "api works well"});
})
// $router /api/feeds/create POST
router.post("/create", passport.authenticate("jwt", {session: false}), (req, res) => {
    console.log(req.body)
    const feedObj = {};
    feedObj.user_id = req.body.user_id;
    feedObj.name = req.body.name
    feedObj.tag = req.body.tags
    if (req.body.text) feedObj.text = req.body.text;
    if (req.body.imgs) {
        feedObj.imgs = req.body.imgs.split("|");
    }

    User.findById(feedObj.user_id)
        .then(user => {
            if(!user) {
                return res.status(400).json('User not exist')
            }

            user.feeds_number += 1
            user.save()
                .then(user => {
                    console.log(user)
                    res.json('Post Success')
                })
                .catch(err => {
                    console.log(err)
                    res.json('Error occured on upload user')
                })
        })

    // save feed
    new Feed(feedObj).save()
        .then(feed => {
            res.json(feed)
        })
        .catch(err => {
            console.log(err)
            res.json('Error Occured on save')
        })
});

// upload img to cloud
router.post('/upload', upload.single('file'), (req, res) => {
    const filePath = './' + req.file.path
    console.log(req.file)
    const fileType = req.file.originalname.split('.').pop()
    const fileName = Date.now() + 'feeds.' + fileType 

    fs.rename(filePath, fileName, (err) => {
        if (err) {
            res.status(102).json('Error occured on upload')        
        } else {
            const localFile = './' + fileName
            const key = 'feeds/' + fileName

            co(function* () {
                client.useBucket(ali_oss.bucket)
                const result = yield client.put(key, localFile)

                const imgSrc = 'http://postifymusic.oss-us-east-1.aliyuncs.com/'+ result.name
                fs.unlinkSync(localFile);
                res.json({msg: 'Success', img: imgSrc})
            }).catch(err => {
                fs.unlinkSync(localFile);
                res.json('Error occured on upload')
            })
        }
    })
})
// $router /api/feeds/concern/latest
//  Get latest feed by following id  from request
router.get("/concern/latest", passport.authenticate("jwt", {session: false}), (req, res) => {

})

// $router /api/feeds/self/latest
// get personal feed by user id from token (reference :user's router get current)
router.get("/self/latest", passport.authenticate("jwt", {session: false}), (req, res) => {

})

// Get lasets feeds from recomment user_id from the req
router.get("/recommend/latest", passport.authenticate("jwt", {session: false}), (req, res) => {

})

module.exports = router;