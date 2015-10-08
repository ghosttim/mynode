var mysql = require('mysql');

var pool = mysql.createPool({
      host     :'localhost',
      database :'mytest',
      user     :'root',
      password :'474727'
	});

pool.getConnection(function(err, connection){
	if(err) console.error(err);
	var user_id = "1";
	var query = "SELECT * FROM `user` WHERE `id`=?";
/*
	tasks.list(function(rows){
		rows
	});
*/
	connection.query(query, [1], function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log(query);
		}
	})

	
});


