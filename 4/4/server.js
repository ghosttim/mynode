var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var templating = require('consolidate');
var handlebars = require('handlebars');
var request    = require('request');
var cheerio    = require('cheerio');
var fs         = require('fs');
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
    s3: 'Mail',
	});
});

app.get("/work",function(req, res){
  var text = fs.readFileSync("result.dat", 'utf8');
	res.render('work',{
		title: 'Новости',
		content: text
	});
});

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


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/add', urlencodedParser, function (req, res) {
 

  if (!req.body){
     return res.sendStatus(400);
   }else{



  //res.writeHead(200, {"Content-Type": "text/html"});
  site = req.body.site;
  sum  = req.body.sum;
  console.log(site +" "+ sum);
  
  
if(site == 'Lenta'){
   request('http://lenta.ru',function(error, response, html){
     	if(!error && response.statusCode == 200){
     		var $ = cheerio.load(html);
        var result = "";
     		$('.b-yellow-box').each(function(i, element){
     			var cols =$(this).find('.item');
     			

     		 for(var n = 0; n < sum; n++) {
          result += cols.eq(n).text()+"\n";
         }
     			 
         
     		});
     	}
        fs.open("result.dat","w",0644, function(err,file_handle){
                if(!err){ fs.write(file_handle,result,null,'utf8'); }
            });
    });
  }else if(site == 'Yandex') {
         request('https://news.yandex.ru/',function(error, response, html){
      if(!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        var result ="";
        $('.rubric__right').each(function(i, element){
          var cols =$(this).find('.link_ajax_yes');
          
        
           for(var n = 0; n < sum; n++) {
          result += cols.eq(n).text()+"\n";
         }
         
        });
      }
        fs.open("result.dat","w",0644, function(err,file_handle){
                if(!err){ fs.write(file_handle,result,null,'utf8'); }
            });
    });
  }else if(site == 'Mail') {
         request('https://news.mail.ru/',function(error, response, html){
      if(!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        var result = "";
        $('.b-flash-news__inner').each(function(i, element){
          var cols =$(this).find('.b-flash-news__short__head__link');
          
        
           for(var n = 0; n < sum; n++) {
          result += cols.eq(n).text()+"\n";
         }
         
        });
      }  console.log(result)
        fs.open("result.dat","w",0644, function(err,file_handle){
                if(!err){ fs.write(file_handle,result,null,'utf8'); }
            });
    });
  }
  res.write('<meta http-equiv="refresh" content="1;URL=/work" />');
  res.write("<b>Information received!</b>");

  res.end();
}
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
});