/*
学习http的request 对象，模拟提交慕课网评论区。
11:03 2017/3/11
 */

var http = require('http');
//将对象序列化
var querystring = require('querystring');
var postData = querystring.stringify({
		'content': '学习学习，讲的很好',
		'mid': 8837
	})
	var opotions = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'zh-CN,zh;q=0.8',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=3e9ef0b6-47f1-4c32-a340-771ecf9607e4; imooc_isnew_ct=1484126450; loginstate=1; apsid=A4Yjk5ZWQxNWY0OWNmMzk2ZmVjMTU3YTExMmFmMjcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjg4NzgyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3ODUxMzI4MjZAcXEuY29tAAAAAAAAAAAAAAAAAAAAADQ2ZDRmMDA2YzE1ODJmZGM4NDBiOWYwNTczM2U0Mzdk7q2qWO6tqlg%3DZT; last_login_username=785132826%40qq.com; PHPSESSID=cl7oh6vna6qs7nhf1f07ebjhj4; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1487580582,1489200101; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1489200207; imooc_isnew=2; cvde=58c363e297b69-16',
		'Host': 'www.imooc.com',
		'Origin': 'http://www.imooc.com',
		'Referer': 'http://www.imooc.com/video/8837',
		'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
}

var req = http.request(opotions, function (res) {
		console.log('Status:' + res.statusCode);
		console.log('headers:' + JSON.stringify(res.headers));
		res.on('data', function (chunk) {
			console.log(Buffer.isBuffer(chunk));
			console.log(typeof chunk);

		})
		res.on('end', function () {
			console.log('评论结束');
		})
	})
	
	req.on('error', function (e) {
		console.log('Error:' + e.message);
	});
	
	req.write(postData);