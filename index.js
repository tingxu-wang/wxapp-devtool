#!/usr/bin/env node

var config = require('./config.json') || {},
	worker = require('./worker');

var fs = require('fs'),
	inquirer = require('inquirer'),
	argv = require('yargs')
		.option('f', {
			alias: 'fix',
			default: true,
			describe: '是否开启js语法检测的文件修改功能，默认为true',
			type: 'boolean'
		})
	.option('i', {
		alias: 'init',
		describe: '定义目标小程序路径',
		type: 'string'
	})
	.help('h')
	.argv;

function runDevtool(){
	fs.exists(config.project_path, function(exist){
		if(exist){
			console.log(`devtool 启动成功, 监听路径为: ${config.project_path}`);
			worker(argv);
		}else{
			console.log(`项目路径: ${argv.project_path} 不存在, 请输入项目的绝对路径`)
		}
	});
}

if(argv.i || !config.project_path){ // 项目初始化
	var questions = [
		{
			type : 'input',
			name : 'projectPath',
			message : '请输入小程序项目绝对路径'
		}
	];
	inquirer.prompt(questions).then(function(answers){
		var projectPath = answers.projectPath;

		fs.exists(projectPath, function(exist){
			if(exist){
				config['project_path'] = projectPath;
				fs.writeFile(`${__dirname}/config.json`, JSON.stringify(config), 'utf8', function(e){
					if(e){
						console.log(e);
						return
					}
					console.log(`保存默认配置成功！目标小程序路径为：${projectPath}`);
					runDevtool();
				})
			}else{
				console.log(`项目路径: ${projectPath} 不存在, 请输入项目的绝对路径`)
			}
		});
	})
}else{ // 执行脚本
	runDevtool();
}