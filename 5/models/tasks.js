var config = require('./config');
    var mysql  = require('mysql');

var Tasks = {
	list: function(allList){
		
	

    config.connect(function(pool){
    pool.getConnection(function(err, connection){
	if(err) { 
		console.error(err);
	}else{
	var query = "SELECT * FROM `todo` ";

	connection.query(query, function(err,rows){
		if(err) console.error(err);
		if(rows){
			allList(rows);

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
	var query = "UPDATE todo SET task = ? WHERE id = ?";

	connection.query(query,[text,id], function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log("Обновление данных!");
		}
	});
}
	
});
});


	},
	complete: function(id, calback){

	config.connect(function(pool){
    pool.getConnection(function(err, connection){
	if(err) { 
		console.error(err);
	}else{
    

	var query = "UPDATE todo SET task = ? WHERE id = ?";

	connection.query(query,["Done",id], function(err,rows){
		if(err) console.error(err);
		if(rows){
			console.log("Выполнено!");
		}
	});
}
	
});
});

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