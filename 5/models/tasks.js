var Tasks = {
	list: function(calback){
		connection.query(query, [1], function(err,rows){
		if(err) {
			console.error(err);
			callback(err, rows);
		}

		if(rows){
			calback(rows);
		}

	},
	add: function(task, calback){

	},
	change: function(id, text, calback){

	},
	complete: function(id, calback){

	},
	delete: function(id, calback){

	}
};
module.exports = Tasks;