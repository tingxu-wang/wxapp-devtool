var config = require('./config.json'),
	eslint = require('./lib/eslint'),
	less = require('./lib/less');

var fs = require('fs');

module.exports = function(argv){
	fs.watch(config.project_path, {recursive: true}, function(eventType, filename){
		console.log(config.project_path)
		// 语法检查
		eslint(filename, argv);
		// .less转.wxss
		less(filename, argv);
	});
};