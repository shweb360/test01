/*
事件模块
TM：20:39 2017/3/9
*/

var EventEmitter=require('events').EventEmitter;

var life=new EventEmitter();

life.on('aa',function(who){
	
	console.log('给'+who+'倒水')
})

life.emit('aa','大爷')