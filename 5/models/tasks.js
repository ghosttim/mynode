var config = require('./config');
    var mysql  = require('mysql');

var Tasks = {
	list: function(connection){
		/*
		connection.query(query, [1], function(err,rows){
		if(err) {
			console.error(err);
			callback(err, rows);
		}

		if(rows){
			calback(rows);
		}
		*/
	

    config.connect(function(pool){
    pool.getConnection(function(err, connection){
	if(err) { 
		console.error(err);
	}else{
	var query = "SELECT * FROM `todo` ";

	connection.query(query, function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log(rows);
		}
	});
}
	
});
});

	},
	add: function(task, connection){
	config.connect(function(pool){
    pool.getConnection(function(err, connection){
	if(err) { 
		console.error(err);
	}else{
	var query = "INSERT INTO todo (task) VALUES (?)";

	connection.query(query,[task], function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log("Запись добавленна!");
		}
	});
}
	
});
});

	},
	change: function(text, id, calback){

		config.connect(function(pool){
    pool.getConnection(function(err, connection){
	if(err) { 
		console.error(err);
	}else{
	var query = "UPDATE todo SET task = ? WHERE id = '?'";

	connection.query(query,[text,id], function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log("Запись обновлена!");
		}
	});
}
	
});
});


	},
	complete: function(id, calback){

	},
	delete: function(id, calback){
	config.connect(function(pool){
    pool.getConnection(function(err, connection){
	if(err) { 
		console.error(err);
	}else{
	var query = "DELETE FROM `todo` WHERE id = ?";

	connection.query(query,[id], function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log("Запись Удалена!");
		}
	});
}
	
});
});

	}
};
module.exports = Tasks;