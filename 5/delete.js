var todo  = require('./models/tasks');
// Отображет все записи
/*
todo.list(function(rows){
		rows;
	});

*/
//Добавляет новую запись
/*
var task = 'update';
todo.add(task, function(rows){
		
	});
*/
//Обновляет данные
/*
var id = 2;
var text = 'new text';
todo.change(text, id, function(rows){
		
	});

*/
//Удаление таблиц
/*
var id = 2;

todo.delete(id, function(rows){
		
	});
*/

module.exports = todo;