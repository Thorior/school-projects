

var mongoose = require('mongoose');


/* create a model for the ideas collection */

var Idea = mongoose.model('Idea', {
 text: {
         type: String,
         required: true,
         minlength: 1,
         trim: true
   } ,
   category: {
         type: String,
         default: null
   },
    completed: {
         type: Boolean,
         default: false
   }
   
   
});




module.exports = {Idea};
