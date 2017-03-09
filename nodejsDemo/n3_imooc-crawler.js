/*
小爬虫，慕课网
2017.03.08
学习地址

http://www.jianshu.com/p/9d70440d2521
http://cnodejs.org/topic/5203a71844e76d216a727d2e
 */

var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filtercharpters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.chapter');

	var courseData = [];
	chapters.each(function (item) {
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		}
		videos.each(function (item) {
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text();
			var id = video.attr('href').split('/video/')[1];
			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		})
		courseData.push(chapterData)
	})
	return courseData;

}
//打印出来
function printCourseInfo(courseData) {
	courseData.forEach(function (item) {
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle);
		item.videos.forEach(function (video) {
			console.log('【' + video.id + '】' + video.title + '');
		})
	});
}

http.get(url, function (res) {
	var html = '';
	res.on('data', function (data) {
		html += data;
	})
	res.on('end', function () {
		var courseData = filtercharpters(html);
		printCourseInfo(courseData);

	})
}).on('error', function () {
	console.log('获取课程失败');
})