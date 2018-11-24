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

module.exports = router;