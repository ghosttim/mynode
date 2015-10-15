var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser());

var session = require('cookie-session');
app.use(session({keys: ['secret']}));

app.set('trust proxy', 1);

var pars = bodyParser.urlencoded({extended: false});



app.get("/",function(req,res){
	if(req.session.auth == 'admin') {
		res.send(200, "<form action='/logout' method='get'><input type='submit' value='Logout'></form>");

	}else {
       res.send(200,"<form action='/login' method='post'><input type='text' name='username' placeholder='Login'><br><input type='password' name='pass' placeholder='Password'><br>Запомнить меня<input type='checkbox' name='save'><input type='submit' value='Login'></form><br>");
	}
	
});

app.post("/login", pars, function(req, res){
	if (!req.body) {
		return res.sendStatus(400);
	}else{
		uLogin = req.body.username;
        uPass  = req.body.pass;
		//res.send(200, uLogin+ "  "+ uPass);
		if (uLogin == "admin" && uPass == "admin") {
			req.session.auth = 'admin';

			res.cookie('uLogin',uLogin);
            res.cookie('uPass', uPass);


			res.end(req.session.auth);

		}else{
		res.send("Bad login or password");
	    }
	}
});

app.get("/test", function(req, res){
	//res.send(200, "кто здесь  " +req.session.auth);
	if(req.session.auth != 'admin'){
		res.redirect('/');
	}else {
		res.send(200, "welcome");
	}
});

app.get("/logout",function(req, res){
	req.session.auth = null;
	res.redirect('/');

});










app.listen(7777, function(err){
	if(err) {
		console.error(err);
	}else{
		console.log("server started");
	}
})