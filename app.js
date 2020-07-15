

var express = require('express');
var path = require('path');
var ip = require('ip');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');

var {mongoose} = require("./config/mongoose");
var { ObjectID } = require('mongodb');

const port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname,"public")));



// pass passport for configuration
//middleware 
app.use(cookieParser()); 
// read cookies (needed for auth) 
// required for passport 
app.use(session({secret: 'VictoriasHaHa', resave: false, saveUninitialized: true}));
//session secret 
app.use(passport.initialize()); 
app.use(passport.session()); 
// persistent login sessions 
app.use(flash());

require('./config/passport')(passport);
require('./routes/routes')(app,passport);





app.listen(port, () => {
    console.log("Server running at ip:port " + ip.address() + ":" + port);
});


module.exports = { app };