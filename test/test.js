
var request = require("request");
var cheerio = require("cheerio");





var express = require('express');
var app = express();


var xere = [];
request('http://lenta.ru',function(error, response, html){
      if(!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        
        $('.b-yellow-box').each(function(i, element){
          var cols =$(this).find('.item');
          
          
          x = (
               cols.eq(0).text()
            +" "+ cols.eq(1).text()
            +" "+ cols.eq(2).text()
            +" "+ cols.eq(3).text()
            +" "+ cols.eq(4).text()
            +" "+ cols.eq(5).text()
          );
        });
        xere = x;
        
      }
      response.write(x);
     });

app.listen(3000);
/*
var http = require('http'),
express = require('express'),
request = require('request'),
cheerio = require('cheerio'),
iconv = require('iconv-lite'),
fs = require('fs'),
vow = require('vow');

var get_table = [], full_table = [];

var cronJob = require('cron').CronJob;

//Назначим работу крону - выполнять переданные функцию раз в час - в 10-ю минуту.
//То есть, в 0:10:00, 1:10:00, 2:10:00 и так далее.
new cronJob('* 23 * * * *', function(){

    var getUrlTables=function (i, url) {

        //Добавляем в массив новый promise. После прохождения всего цикла получим
        //массив всех promise, который очень удобно отслеживать.
        get_table_promise[i]=vow.promise();

        request({uri:url,method:'GET',encoding:'binary'},
            function (err, res, body) {
                //Получили текст страницы, теперь исправляем кодировку и 
                //разбираем DOM с помощью Cheerio.
                var $=cheerio.load(
                    iconv.encode(
                        iconv.decode(
                            new Buffer(body,'binary'),
                        'win1251'),
                    'utf8')
                );
                table='';
                //Cheerio даёт возможность навигации по DOM
                //с помощью стандартных CSS-селекторов.
                $('table#info_table > tr').each(function(){
                    table+='<tr>'+this.html()+'</tr>';
                });

                //Работа с таблицей, удаление ненужных строк и прочего
                table=table.split('</td></tr><tr><td>');
                table.splice(0,1);
                table=table.join('</td></tr><tr><td>');
                //Складываем результат в массив результатов и завершаем promise
                full_table[i]='<tr><td>'+table;
                get_table_promise[i].fulfill();
            });
    }

    var crawlData=(function () {
        var urls={1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10'};

        //Обрабатываем каждый адрес из списка
        for(i in urls)
            getUrlTables(i,urls[i]);

        //Передаём в all массив Promise - он дождётся завершения их всех.
        vow.all(get_table_promise).spread(function (building) {

            //Склеим все полученные таблицы в одну
            full_info='<table>';
            for(i in urls) full_info+=full_table[i];
            full_info+='</table>';

            //Имя файла будет формироваться из текущей даты и времени
            date=new Date;
            day=date.getDate(); mon=date.getMonth()+1;
            yr=date.getFullYear(); hr=date.getHours();
            date_str=((hr<10?'0':'')+hr)+'_'+((day<10?'0':'')+day)
                +((mon<10?'-0':'-')+mon)+'-'+yr;

            //Сохраняем результат
            fs.open("vrosts_"+date_str+".dat","w",0644, function(err,file_handle){
                if(!err){ fs.write(file_handle,full_info,null,'utf8'); }
            });
        });
    })();

}, null, true);
*/