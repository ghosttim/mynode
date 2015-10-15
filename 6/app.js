var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser());

var session = require('cookie-session');
app.use(session({keys: ['secret']}));

//app.set('trust proxy', 1);

var pars = bodyParser.urlencoded({extended: false});



app.get("/",function(req,res){

   if(req.session.auth == 'admin') {
		res.send(200, "<form action='/logout' method='get'><input type='submit' value='Logout'></form><br><br><a href='/topsecret'>Top Secret</a>");


	}else{

		 if(req.cookies.uLogin == "admin" && req.cookies.uPass == "admin"){
         req.session.auth = 'admin';
         res.redirect('/');
         

	}else{
       res.send(200,"<form action='/login' method='post'><input type='text' name='username' placeholder='Login'><br><input type='password' name='pass' placeholder='Password'><br>Remember me<input type='checkbox' name='save'><input type='submit' value='Login'></form><br>");
	     }
	}
	
});

app.post("/login", pars, function(req, res){
	if (!req.body) {
		return res.sendStatus(400);
	}else{
		uLogin = req.body.username;
        uPass  = req.body.pass;
        uSave  = req.body.save;
  
		if (uLogin == "admin" && uPass == "admin") {
			req.session.auth = 'admin';

           if (uSave){
           	res.cookie('uLogin',uLogin);
            res.cookie('uPass', uPass);
           }
			


			//res.write("Welcome, you are logged in as: " +req.session.auth+"<br><br><a href='/'>Home Page</a><br><a href='/topsecret'>Top Secret</a>");
            res.redirect('/')
		}else{
		res.send("Incorrect login or password<br><br><a href='/'>Back</a>");
	    }
	}
});

app.get("/topsecret", function(req, res){
	//res.send(200, "кто здесь  " +req.session.auth);
	if(req.session.auth != 'admin'){
		res.redirect('/');
	}else {
		res.send(200, "Welcome to classified information.<br><br><a href='/'>Home Page</a>");
	}
});

app.get("/logout",function(req, res){
	req.session.auth = null;
	res.clearCookie('uLogin');
	res.clearCookie('uPass');
	res.redirect('/');

});



app.listen(7777, function(err){
	if(err) {
		console.error(err);
	}else{
		console.log("server started");
	}
})