
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema( {
      name:{
            type: String,
            required: true,
            minlength: 1,
            trim: true
      },
      email: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
      },
      password:{
            type: String,
            required: true,
            minlength: 1,
            trim: true
      }
});

//var User = mongoose.model("user",userSchema);

// generating a hash 
userSchema.methods.generateHash = function(password) {
           return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
       }; 

// checking if password is valid
userSchema.methods.validPassword = function(password) {
           return bcrypt.compareSync(password, this.password);
       };

module.exports = {User} = mongoose.model("user",userSchema); ;