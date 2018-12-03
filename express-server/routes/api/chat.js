const Friend = require('../../models/Friend');
const User = require('../../models/User');
const express = require('express');
const router = express.Router();

/* GET home page of chat module. */
router.get('/chat/:email', function (req, res) {
	var myEmail = req.params.email;
	// console.log(myEmail);
	User.findOne({email: myEmail}, function(err, user){
		if (err){
			res.send(err);
        }
        
        if(!user){
            res.json("No user found")
        } else{
			// get my friends
			Friend.find({user_id: user._id}).populate('friend_id').exec(function(err, friend){
				if (err){
					console.log("error occurred");
					res.send(err);
				}else{
					// console.log(friend);
					res.send(friend);
				}
			});
		}
	})
});



module.exports = router;
