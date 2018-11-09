
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(cors())

const users = require("./routes/api/users");
app.use("/api/users", users);

const db = require("./config/key").mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected With DB"))
    .catch(err => console.log(err));

require("./config/passport")(passport);


app.listen(port, () => {
    console.log('Server running on ${port}');
});