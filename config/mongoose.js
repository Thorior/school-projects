

var mongoose = require('mongoose');
var ipaddy = "192.168.1.2";
var dbPort = 27017;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.1.2:${dbPort}/userIdeas_db',{ useNewUrlParser: true } )
.then(() =>  console.log('Connected to userIdeas database on port 27017'))
  .catch((err) => console.error(err));

module.exports = {mongoose};
