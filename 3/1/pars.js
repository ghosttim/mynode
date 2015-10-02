var request = require('request');
var cheerio = require('cheerio');

request('http://lenta.ru/', function(error, response, html){
	if(!error && response.statusCode == 200){
		var $ = cheerio.load(html);
		$('.b-yellow-box').each(function(i, element){
			var cols = $(this).find('.item');
			console.log(
				cols.eq(0).text()
				+" "+ cols.eq(1).text()
				+" "+ cols.eq(2).text()
				+" "+ cols.eq(3).text()
				+" "+ cols.eq(4).text()
				+" "+ cols.eq(5).text()
				);
		});
	}else{
		console.log("Ерорище");
	}
});