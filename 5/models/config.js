var config = {
	connect:function(param){
	var mysql = require('mysql');	
	var pool = mysql.createPool({
      host     :'localhost',
      database :'mytest',
      user     :'root',
      password :''
	});
	if (!pool) {
		console.error("Ошибка подключения"+error)
	}else{
		console.log("подключено");
		param(pool);
	}
	}

};

module.exports = config;