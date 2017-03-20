/*
description:获取微信token，并自定义菜单
date：16:14 2017/3/13
*/

var https = require('https');
var _url = require('url');
var querystring = require('querystring');

//微信配置信息
var appid = 'wx75108a5e276b6ec1';
var appsecret = 'd4624c36b6795d1d99dcf0547af5443d';
var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret;

https.get(url, (res) => {
	
	res.on('data', (d) => {		
		//第一步、获取access token，将json转对象
		var token = JSON.parse(d).access_token
		//process.stdout.write('token:' + token);
		console.log('1状态码：', res.statusCode);
			
		//1、自定义菜单
		wx_createMenu(token);
		
		//2、自定义菜单删除接口		
		//deleteMenu(token);
		   
	});

}).on('error', (e) => {
	console.error(e);
});

//获取微信服务器IP地址
function wx_getcallbackip(token) {
	var getIpUrl = 'https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=' + token;
	https.get(getIpUrl, (res) => {
		console.log('2状态码：', res.statusCode);
		res.on('data', (d) => {

			process.stdout.write('ip_list :' + d);
		});

	}).on('error', (e) => {
		console.error(e);
	});
}

//1、自定义菜单
function wx_createMenu(token) {
	   var menuUrl='https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+token;
	   
		var post_option = _url.parse(menuUrl);
		post_option.method = "POST";
		post_option.port = 443;
		var post_data = querystring.stringify({
			"button": [{
					"type": "click",
					"name": "今日歌曲",
					"key": "V1001_TODAY_MUSIC"
				}, {
					"name": "菜单",
					"sub_button": [{
							"type": "view",
							"name": "搜索",
							"url": "http://www.soso.com/"
						}, {
							"type": "view",
							"name": "视频",
							"url": "http://v.qq.com/"
						}
					]
				}
			]			
		});
		post_option.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		};
		var post_req = https.request(post_option, function (res) {
				res.setEncoding('utf8');
				console.log('3状态码：', res.statusCode);
				res.on('data', function (chunk) {
					console.log(chunk);
				});
			});
		post_req.write(post_data);
		post_req.end();

}

//2、删除菜单
function deleteMenu(token)
{
	var getIpUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=' + token;
	https.get(getIpUrl, (res) => {
		console.log('4删除菜单状态码：', res.statusCode);
		res.on('data', (d) => {

			process.stdout.write('ip_list :' + d);
		});

	}).on('error', (e) => {
		console.error(e);
	});
}

