/*
函数学习
 */
var http = require('http');    
var otherfun= require("./models/otherfuns.js");
http.createServer(function  (request,response){        
    response.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});        
        if(request.url!=="/favicon.ico"){ 
		  //清除第2此访问
          //fun1(response);
          //-------用字符串调用对应的函数---
        /*   funname  =  'fun3';
          otherfun[funname](response); */
          otherfun['getVisit'](response,response);
          response.end('');    
    }
}).listen(8000);        
console.log('Server running at http://127.0.0.1:8000/'); 