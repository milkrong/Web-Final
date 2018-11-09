
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express();
app.use(morgan('combined'));

app.use(cors());
// require routers
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const feeds  = require("./routes/api/feeds");
const follow  = require("./routes/api/follow");
// require config
const db = require("./config/key").mongoURI;

// middleware bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(port, () => {
    console.log('Server running on ${port}');
});