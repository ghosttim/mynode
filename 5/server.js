var tasks  = require('./models/tasks');
// Отображет все записи
/*
tasks.list(function(rows){
		rows;
	});
*/

//Добавляет новую запись
/*
var task = 'update';
tasks.add(task, function(rows){
		
	});
*/
//Обновляет данные
/*
var id = 2;
var text = 'new text';
tasks.change(text, id, function(rows){
		
	});

*/
//Удаление таблиц
var id = 2;

tasks.delete(id, function(rows){
		
	});