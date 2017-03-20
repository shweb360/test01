/*
回调函数
22:54 2017/3/13
 */
var i = 0;
function print() {
	console.log(i);
}
//定时1秒后，执行回调函数
function plus(callback) {
	setTimeout(function () {
		i += 1;
		callback();
	}, 1000);
}
//调用
plus(print);