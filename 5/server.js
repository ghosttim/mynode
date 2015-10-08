var mysql = require('mysql');

var connection = mysql.createConnection({
      host     :'127.0.0.1',
      database :'mysql',
      user     :'root',
      password :''
	});

connection.connect(function(err){
	if (err){
		console.error("Вот блин \n"+err);
	}else{
		console.log("Подключено");
	}
});

