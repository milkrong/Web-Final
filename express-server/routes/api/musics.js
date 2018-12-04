const express = require("express");
const router = express.Router();
const passport = require("passport");

const Music = require('../../models/Music');

router.get('/all', (req, res) => {
    Music.find()
        .then(musics => {
            if(!musics) {
                res.status(400).json('No Music in the website')
            } else {
                res.json(musics)
            }
        });
});

router.get('/top', (req, res) => {
    Music.find({}, ['title','src', 'pic', 'artist', 'hot_level']).sort({hot_level: 1}).limit(5)
        .then(musics => {
            if(!musics) {
                res.status(400).json('No Music in the website')
            } else {
                re_music = []
                musics.forEach((music, i) => {
                    re_music.push({
                        title: music.title,
                        artist: music.artist,
                        src: music.src,
                        pic: music.pic
                    })
                })
                res.json(re_music)
            }
        });
});

router.post('/create', (req, res) => {
    const newMusic = new Music()
    if(req.body.title) newMusic.title = req.body.title
    if(req.body.artist) newMusic.artist = req.body.artist
    if(req.body.pic) newMusic.pic = req.body.pic
    if(req.body.lrc) newMusic.lrc = req.body.lrc 
    if(req.body.category) newMusic.category = req.body.category

    newMusic.src = req.body.src
    newMusic.save()
        .then(music => {
            res.json(music)
        })
        .catch(err => {
            res.json('Upload Failed')
        })
})

router.get('/count', (req, res) => {
    Music.count({}, function(err, c) {
        if(err) res.status(500).json("get count is valid")

        res.json(c)
    })
})

module.exports = router;