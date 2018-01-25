var fs = require('fs');

var config = require('./config.json');

var eslint = require('./lib/eslint'),
	less = require('./lib/less');

fs.watch(`../${config.project_name}`, {recursive: true}, function(eventType, filename){
	// 语法检查
	eslint(filename);
	// .less转.wxss
	less(filename);
});