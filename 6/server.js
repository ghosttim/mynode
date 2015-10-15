var express = require("express");
var app = express();

var cookieParser = require("cookie-parser");
app.use(cookieParser());

var bodyParser = require("body-parser");
app.use(bodyParser());

var session = require("cookie-session");
app.use(session({keys: ['secret']}));

var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
	if(username != "admin") {
		return done(null, false, {message: "not admin"});
	}
	if(password != "admin") {
		return done(null, false, {message: "not password"});
	}

	return done(null, {username: "admin"});
}));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(id, done) {
	done(null, {username: id});
});

var auth = passport.authenticate(
	'local', {
		successRedirect: "/user",
		failureRedirect: "/login"
	}
);	

app.get("/login", function(req, res) {
	res.send(200, "<form action='/login' method='post'>Login:<input type='text' name='username'/>Pass:<input type='password' name='password' /><input type='submit' /></form>");
});

app.get("/", auth);
app.post('/login', auth);

var mustBeAuthenticated = function(req, res, next) {
	req.isAuthenticated() ? next() : res.redirect('/');
}

app.all("/user", mustBeAuthenticated);
app.all("/user/*", mustBeAuthenticated);

app.get('/user', function(req, res) {
	res.send(200, 'User, ' + req.user.username);
});	

app.get('/user/settings', function(req, res) {
	res.send(200, 'user settings');
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect("/");
});

app.listen(8080);