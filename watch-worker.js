var config = require('./config.json'),
	eslint = require('./lib/eslint'),
	less = require('./lib/less');

var fs = require('fs');

module.exports = function(argv){
	fs.watch(config.project_path, {recursive: true}, function(eventType, filename){
		console.log(new Date().toString());
		// 语法检查
		eslint.watch(filename, argv);
		// .less转.wxss
		less.watch(filename, argv);
	});
};