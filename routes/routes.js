





module.exports = (app,passport) => {

var User  = require('../models/user');


app.get("/",(req,res)=>{
  if(req.session.User){
    console.log(req.session.User," : user from get / route");
     res.send(req.session.User.name);
     //res.sendFile("index.html",{root:'./bin/www'});  // want to set up persistent user name here
     
     return;
   }
   else{
     console.log("no user logged in");
     res.sendFile("index.html",{root:'./bin/www'});
     return;
   }
  
});

app.post("/login",function(req, res) {
  passport.authenticate("local-login", function(err, user, info) {
    if (err) {
      
      res.status(404).send(err);
      return;
    }

    if (user) {
      console.log(typeof(user),"user from success response");
      req.session.User = user;
      res.send(user);
    } else {
      console.log(info.message,"info from 401 response");
      res.status(401).send(info.message);
    }
  })(req, res);
});

app.get("/index",function(req,res){

});
///////////////////////////////////////////////////////////////



// process the signup form    
 app.post('/', passport.authenticate('local-signup', {
   
            successRedirect : '/', 
  // redirect to wherever you want to go        
            failureRedirect : '/signUp' ,
  // redirect back to the signup page if there is an error   
            successFlash:true,
            
    })
 );
 /*    Custom Strategy     needs work still
 app.post('/', passport.authenticate('MyStrat', {
   
  successRedirect : '/index', 
// redirect to wherever you want to go        
  failureRedirect : '/FAQ' ,
// redirect back to the signup page if there is an error   
  successFlash:true,
  
    }),
  function(req,res){
    res.redirect('/');
    }
 );
*/

}; 