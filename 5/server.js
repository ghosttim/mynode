var express    = require('express');
var app        = express();

var handlebars = require('handlebars');
var templating = require('consolidate');
var tasks      = require('./models/tasks');
var bodyParser = require('body-parser');
var url        = require('url');

app.engine('html',templating.handlebars);
app.set('view engine','html');
app.set('views',__dirname + '/views');


app.get('/', function(req, res) {

	 tasks.list(function(allList){
	   var x = allList;

	   res.render('index', {
	   	  title: 'Список задач',
	   	  num1:  x[0].id,
	   	  num2:  x[1].id,
		  task1: x[0].task,
		  task2: x[1].task,
		 /* task3: x[2].task,
		  task4: x[3].task,
		  task5: x[4].task,
		  task6: x[5].task,
		  task7: x[6].task,
		  task8: x[7].task,
		  task9: x[8].task,
		  task10: x[9].task,*/
	    });
	});
});

var pars = bodyParser.urlencoded({ extended: false });


app.post('/add', pars, function (req, res) {
 

  if (!req.body){
     return res.sendStatus(400);
   }else{


  newTask = req.body.newTask;
  console.log("Новая запись: "+newTask);
  tasks.add(newTask, function(connection){});
  
  res.redirect('/');

}
});


app.get('/update', function(req, res) {

     var path = url.parse(req.url).query;
     console.log(path);
	 //res.send("updateeeee");
	 res.render('update', {
	 	title: 'Обновление',
	 	uid: path
	 });
});

app.post('/upp', pars, function (req, res) {
 

  if (!req.body){
     return res.sendStatus(400);
   }else{


  upTaskId = req.body.upTaskId;
  upTaskText = req.body.upTaskText;

  tasks.change(upTaskText, upTaskId, function(calback){});

  console.log("Запись обновлена! Id: "+upTaskId+ " text: "+upTaskText);
  
  res.redirect('/');

}
});

app.get('/delete', function(req, res) {

     var path = url.parse(req.url).query;
     console.log(path);
	 //res.send("updateeeee");
	 res.render('delete', {
	 	title: 'Удалить запись?',
	 	uid: path
	 });
});

app.post('/del', pars, function (req, res) {
 

  if (!req.body){
     return res.sendStatus(400);
   }else{


  delTask = req.body.delTask;
  console.log("Запись удалена: "+delTask);
  tasks.delete(delTask, function(connection){});
  
  res.redirect('/');

}
});

app.get('/do', function(req, res) {

	var path = url.parse(req.url).query;
	

	 tasks.complete(path, function(allList){});
	res.redirect('/');
});

















var server = app.listen(9001, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening: ", host, "port: ", port);
});