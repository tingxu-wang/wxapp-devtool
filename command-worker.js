var config = require('./config.json'),
	eslint = require('./lib/eslint'),
	less = require('./lib/less');

var fs = require('fs');

module.exports = function(argv){
	console.log(new Date().toString());

	eslint.command(argv);
	less.command(argv);
};