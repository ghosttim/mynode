var config = {
	connect:function(param){
	var mysql = require('mysql');	
	var pool = mysql.createPool({
      host     :'localhost',
      database :'mytest',
      user     :'root',
      password :'474727'
	});
	if (!pool) {
		console.error("Ошибка подключения"+error)
	}else{
		param(pool);
	}
	}

};

module.exports = config;