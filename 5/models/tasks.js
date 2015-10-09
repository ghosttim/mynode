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
	var query = "INSERT INTO `todo`(tack)";

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
	change: function(id, text, calback){

	},
	complete: function(id, calback){

	},
	delete: function(id, calback){

	}
};
module.exports = Tasks;