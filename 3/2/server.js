var http = require('http');
var req = require('request');
var url = require('url');
var pathname = 'https://translate.yandex.net/api/v1.5/tr.json/translate?';

/*
function res(){
request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151001T164023Z.c33ff54dc6316afc.b0b9dfb6907cb412eb2eead681cb41a6b6141e1c&lang=en-ru&text=hi', function(error, response, body){
        if(!error && response.statusCode == 200){
            var result = body{text};
            console.log(result);
            return result;
        }else{
            console.error(error);
        }
    });

}
console.log(res);
*/

 var body = '<html>'+
    '<head>'+
    '<title>Переводчик</title>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="" method="get" style="text-align:center">'+
    '<input type="text" value="trnsl.1.1.20151001T164023Z.c33ff54dc6316afc.b0b9dfb6907cb412eb2eead681cb41a6b6141e1c" name="key" hidden>'+
    '<input type="radio" name="lang" value="ru-en" checked>Русский - Английский'+
    '<input type="radio" name="lang" value="en-ru">Английский - Русский<br><br>'+
    '<textarea name="text" rows="20" cols="40"></textarea><br><br>'+
    '<input type="submit" value="Перевести" />'+
    '</form>'+
    '</body>'+
    '</html>';
 

function onRequest(request, response){
    pathname = pathname + url.parse(request.url).query;
//console.log(request.url);
        req(pathname, function(error, response, body){
            if(!error && response.statusCode == 200){
                var result = body;   
                console.log(result);
                return result;
            }else{
                console.error("Ошибка! "+ error);
            }
        });
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server has started");

/*
var params = url.parse(pathname, true
);

    console.dir(params);
*/