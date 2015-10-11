var express    = require('express');
var app        = express();

var handlebars = require('handlebars');
var templating = require('consolidate');
var tasks  = require('./models/tasks');

app.engine('html',templating.handlebars);
app.set('view engine','html');
app.set('views',__dirname + '/views');

app.get('/', function(req, res, test) {

	tasks.list(function(allList){
		//return test(allList.todo);
	   var x = allList;
		//console.log(x);
	   test (x);
	});
console.dir(test[]);
//console.log(test)
//res.send(toString(test));

	res.render('index', {
		title: 'Список задач'
	});
});





var server = app.listen(9001, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening: ", host, "port: ", port);
});