var http = require('http');
var urlutils = require('url');

 var body = '<html>'+
    '<head>'+
    '<title>Переводчик</title>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="https://translate.yandex.net/api/v1.5/tr.json/translate" method="get">'+
    '<input type="text" value="trnsl.1.1.20151001T164023Z.c33ff54dc6316afc.b0b9dfb6907cb412eb2eead681cb41a6b6141e1c" name="key" hidden>'+
    '<input type="radio" name="lang" value="ru-en" checked>Русский - Английский'+
    '<input type="radio" name="lang" value="en-ru">Английский - Русский<br>'+
    '<textarea name="text" rows="20" cols="40"></textarea>'+
    '<input type="submit" value="Перевести" />'+
    '</form>'+
    '</body>'+
    '</html>';


function onRequest(request, response){
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server has started");