$(document).ready(function() {

    var imageArray = new Array(numImages); //create new array to preload images 
    var numImages = 2;
    var imageCounter = 0;


    for (var i = 0; i < numImages; i++) {
        imageArray[i] = new Image(); //set image src property to image path,preloading image in the process
        imageArray[i].src = "../../public/images/brightIdea" + (i+1) + ".png";
    }


    //if browser does not support the image object, exit.
    if (!document.images)
        return;

    setInterval(function() {

        $("#blinking_image").attr("src", imageArray[imageCounter++].src);

        if (imageCounter == numImages)
            imageCounter = 0;

    }, 700); //end setInterval



}); //end $(document).ready




/******************************************************************************/
///////////////  function to be used on /get refresh  //////////////////

$(document).ready(function() {
  
    $.get("/",function(data){
        
        $("#target").prepend("Welcome back!"+data.name+" "); 
   
},'json').done(function() {
    alert( "success!" );
  })
  .fail(function() {
    alert("failed" );
  });

}); //end $(document).ready



/****************************************************************************/

$(document).ready(function() {
    $("._submit").click(function() {
        var $temp= $(".reqd").val();
       //variable holding regular expression
        var notInName=/[^0-9|!|@|#|$|%|^|&|*|(|)|_|+|=|{|}|||\|:|;|”|<|>|?|,|.|/|~|[|]|]/;

       if($temp==""){
        alert("Please Enter a valid Last Name.");
        return false;
       }
       else if(notInName.test($temp)==false){
        alert("Please Enter a valid Last Name.");
        return false;
       }
       
         var $emailValidator = $("form").validate({
            
             wrapper: 'div',

            rules:{
                emailEntry:{
                     required: true,
                     email: true,
                 },
            }
        }); //end validate
     

        var $isEmailValid = $emailValidator.element("#reqdEmail");

        if(!$isEmailValid){
            alert("please enter a valid e-mail.");
            return false;
        }
        else {
            alert("Form submitted");
            window.location="index.html";
        }
    }); //end click
}); //end ready

/***********************************************************************************/

$(document).ready(function() {
    $("._reset").click(function() {
    	
     var validator= $("form").validate();
     validator.resetForm();
    });
});

/************************************************************************************/

$(document).ready(function() {
         $(function() {
            var dialog, form,
               
            // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
            emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            name = $( "#name" ),
            email = $( "#email" ),
            password = $( "#password1" ),
            chckpass = $("#password2"),
            allFields = $( [] ).add( name ).add( email ).add( password ).add(chckpass),
            tips = $( ".validateTips" );

        function updateTips( t ) {
            tips
                .text( t )
                .addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }

        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }

        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }
        function checkPassword(o,n){
            console.log(o.val(),"o from check password func");
            console.log(n.val(),"n from check password func");
            if(o.val() == n.val()){
               return true;
            }
            else{
                    n.addClass( "ui-state-error" );
                    updateTips(n);
                    return false;
                }
        }

        function addUser() {
            var valid = true;
             
            allFields.removeClass( "ui-state-error" );

            valid = valid && checkLength( name, "username", 3, 16 );
            valid = valid && checkLength( email, "email", 6, 80 );
            valid = valid && checkLength( password, "password", 5, 16 );
            valid = valid && checkLength( chckpass, "password", 5, 16 );

            valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
            valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
            valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
            valid = valid && checkRegexp( chckpass, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
            valid = valid && checkPassword(password,chckpass);
                
              
            
                
            if ( valid ) {
               //var data = $("#dialog-form").serializeArray();
                //data.push({name: 'name', value: name.val()});
                //data.push({name: 'email', value: email.val()});
                
                $.post("/", {name:name.val(),email:email.val(),password:password.val()});
                
                    console.log("from post");
               
                //console.log(data);
                console.log(name.val());
                console.log(email.val());
                console.log(password.val());
               // $( "#users tbody" ).append( "<tr>" +
                 //   "<td>" + name.val() + "</td>" +
                  // "<td>" + email.val() + "</td>" +
                  //  "<td>" + password.val() + "</td>" +
               // "</tr>" );
                dialog.dialog( "close" );

            }
           return valid;
        }

        dialog = $( "#dialog-form" ).dialog({
            autoOpen: false,
            height: 400,
            width: 350,
            modal: true,
            buttons: {
                "Create an account": addUser,

                Cancel: function() {
                    dialog.dialog( "close" );
                }
            },
            close: function() {
                form[ 0 ].reset();
                allFields.removeClass( "ui-state-error" );
            }
        });

        form = dialog.find( "form" ).on( "submit", function(event) {
            
            event.preventDefault();
           addUser();
        });

        $( "#signUp" ).button().on( "click", function() {
            dialog.dialog( "open" );
       });
    });////end function     
});

/**********************************************************************************/


$(document).ready(function() {
         $(function() {
            var dialog, form,

            // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
            emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
           // name = $( "#name" ),
            email = $( "#email" ),
            password = $( "#password" ),
            allFields = $( [] ).add( name ).add( email ).add( password ),
            tips = $( ".validateTips" );

        function updateTips( t ) {
            tips
                .text( t )
                .addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }

        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }

        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }

        function addUser() {
            var valid = true;
            allFields.removeClass( "ui-state-error" );

            //valid = valid && checkLength( name, "username", 3, 16 );
            valid = valid && checkLength( email, "email", 6, 80 );
            valid = valid && checkLength( password, "password", 5, 16 );

           // valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
            valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
            valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

                
            if ( valid ) {
                
              $.post("/login",{email: email.val(),password: password.val()},function(data){
                    
                        $("#target").prepend(data.name); 
                   
               },'json').done(function() {
                alert( "Welcome!" );
              })
              .fail(function() {
                alert( "Incorrect Password." );
              });
               
              
                dialog.dialog( "close" );

            }
           return valid;
        }

        dialog = $( "#dialog-form2" ).dialog({
            autoOpen: false,
            height: 400,
            width: 350,
            modal: true,
            buttons: {
                "login": addUser,

                Cancel: function() {
                    dialog.dialog( "close" );
                }
            },
            close: function() {
                form[ 0 ].reset();
                allFields.removeClass( "ui-state-error" );
            }
        });

        form = dialog.find( "form" ).on( "submit", function(event) {
           
            event.preventDefault();
           addUser();
        });

        $( "#login" ).button().on( "click", function() {
            dialog.dialog( "open" );
       });
    });////end function     
});
