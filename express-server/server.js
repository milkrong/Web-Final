
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

const chatRecords = require('./models/chatRecords');
const socketRecords = require('./models/socketRecords');
const port = process.env.PORT || 5000;

const app = express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
app.use(morgan('combined'));

app.use(cors());
// require routers
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const feeds  = require("./routes/api/feeds");
const follow  = require("./routes/api/follow");
const friends  = require("./routes/api/friends");
const setting = require("./routes/api/setting");
const musics = require("./routes/api/musics");
const admin = require("./routes/api/admin");
const chat = require("./routes/api/chat");
// require config
const db = require("./config/key").mongoURI;

// middleware bodyparser
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// connect mongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected With DB"))
    .catch(err => console.log(err));

// use passport 
app.use(passport.initialize());
require("./config/passport")(passport);
// use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/feeds", feeds);
app.use("/api/follow", follow);
app.use("/api/setting", setting);
app.use("/api/friends", friends);
app.use("/api/musics", musics);
app.use("/api/admin", admin);
app.use("/api/chat", chat);


const friendsSocket = {};
const friendsId = {};
const friendsOnline = [];
io.on('connection', function (socket) {

	// when friend are logging in
	socket.on('friendOn', function (data) {
		// save his id and socket for disconnection
		friendsId[socket] = data.sender;
		friendsSocket[data.sender] = socket;
		friendsOnline.push(data.sender);
		socketRecords.findOneAndUpdate(
			{ user_id : data.sender },
			{ $set: { user_id: data.sender, socketInfo: socket.id}},
			{ upsert:true, returnNewDocument : true },
			function(err, s){
				if (err){
					console.log(err)
				}else{
					console.log(s)
				}
			}
		);
    });

	//load history
	socket.on('load history', function (data) {
		chatRecords.find(
			{
				user_id: data.sender,
				friend_id: data.receiver,
			},
			['sendOrRecv', 'message'],
			{
				sort: {'_id': 1}
			},
			function (err, c){
				if (err){
					console.log(err)
				}else{
					console.log(c)
					socket.emit('get history', c)
				}
			})
    });
    
// get message
	socket.on('send a message', function (data) {
		var sender = data.sender;
		var receiver = data.receiver;
		console.log(data.sender+' '+data.msg+' '+data.receiver);

		let sendRecord = new chatRecords({
			user_id: data.sender,
			friend_id: data.receiver,
			message:  data.msg,
			sendOrRecv: 'send'
		});
		sendRecord.save(function(err){
			if(err){
				console.log(err)
			}else{
				console.log('saved!')
			}
		});
		let recvRecord = new chatRecords({
			user_id: data.receiver,
			friend_id: data.sender,
			message:  data.msg,
			sendOrRecv: 'receive'
		});
		recvRecord.save(function(err){
			if(err){
				console.log(err)
			}else{
				console.log('saved!')
			}
        });
        socketRecords.findOne({user_id: data.receiver}, function (err, s){
			if (err){
				console.log('Something abnormal')
			}else if (s === null || s === undefined){
				console.log('your friend is offline')
			}
			else if (s.socketInfo === undefined || s.socketInfo===null) {
				console.log('your friend is offline')
			}else{
				io.to(s.socketInfo).emit('receive a message',
					{sender: sender, receiver: receiver, msg: data.msg})
			}
		});
    });
    
    // disconnect
	socket.on('disconnect', function(){
		var friend = friendsId[socket];
		var idx = friendsOnline.indexOf(friend);
		friendsOnline.splice(idx, 1);
		delete friendsId[socket];
		delete friendsSocket[friend];

		socketRecords.findOneAndUpdate(
			{socketInfo: socket.id},
			{$set: {socket: null}},
			{new: true},
			function (err, s){
			if (err){
				console.log('Something abnormal')
			}else{
				console.log(s)
			}
		});

		console.log(friend+" is offline");

	})
});

server.listen(port, () => {
    console.log('Server running on ${port}');
});