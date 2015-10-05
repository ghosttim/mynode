var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var templating = require('consolidate');
var handlebars = require('handlebars');
var request    = require('request');
var cheerio    = require('cheerio');
var site;
var sum;

app.engine('html',templating.handlebars);
app.set('view engine','html');
app.set('views',__dirname+'/views');

app.get("/",function(req, res){
	res.render('index',{
		title:'Информатор',
		content:'Выберите параметры',
		s1: 'Lenta',
		s2: 'Yandex',
	});
});
/*
app.get("/work",function(req, res){
	res.render('work',{
		title: 'Это работает!!',
		content: 'крутой модуль'
	});
});
*/
/*
var jsonParser = bodyParser.json();

app.post('/work', jsonParser, function(req, res) {
	if(!req.body) {
		return res.sendStatus(400);
		console.log("400");
	}else{
    
	console.log(req.body.sum);
	res.end();
    }
});
*/
function Site(){
	request('http://lenta.ru',function(error, response, html){
     	if(!error && response.statusCode == 200){
     		var $ = cheerio.load(html);
     		$('.b-yellow-box').each(function(i, element){
     			var cols =$(this).find('.item');
     			var x = cols.eq(0).text();
     			
     			res.write(x);
     		});
     	}
     });
}
function test(){
	var a = "5";
	var b = "5";
	return "<h3>a + b<h3>";
}
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/work', urlencodedParser, function (req, res) {
  if (!req.body){
     return res.sendStatus(400);
   }else{
  res.writeHead(200, {"Content-Type": "text/html"});
  site = req.body.site;
  sum  = req.body.sum;
  console.log(site +" "+ sum);
  //res.write(Site());



  var r = request('http://lenta.ru',function(error, response, html){
     	if(!error && response.statusCode == 200){
     		var $ = cheerio.load(html);
     		$('.b-yellow-box').each(function(i, element){
     			var cols =$(this).find('.item');
     			//var x = cols.eq(0).text();
     			var form = r.form();
     			form.append(cols.eq(0).text());
     			console.log(
				    cols.eq(0).text()
				    +" "+ cols.eq(1).text()
				    +" "+ cols.eq(2).text()
				    +" "+ cols.eq(3).text()
				    +" "+ cols.eq(4).text()
				    +" "+ cols.eq(5).text()
				);
     		});
     	}
    });


  res.end();
}
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
});