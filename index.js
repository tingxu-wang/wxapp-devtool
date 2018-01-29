#!/usr/bin/env node

var config = require('./config.json') || {},
	watchWorker = require('./watch-worker'),
	commandWorker = require('./command-worker');

var fs = require('fs'),
	child_process = require('child_process'),
	inquirer = require('inquirer'),
	argv = require('yargs')
		.option('fa', {
			alias: 'fix-auto',
			default: false,
			describe: '开启后每次保存文件后对该文件运行eslint --fix，本操作会更改文件的内容，本命令需配合-w命令一同使用，默认为false',
			type: 'boolean'
		})
		.option('fp', {
			alias: 'fix-prev',
			default: false,
			describe: '对最近一次编辑的有问题的.js文件运行eslint --fix，本操作会更改文件的内容',
			type: 'boolean'
		})
		.option('fm', {
			alias: 'fix-modified',
			default: false,
			describe: '对git仓库下所有编辑过的文件运行eslint --fix，本操作会更改文件的内容',
			type: 'boolean'
		})
		.option('i', {
			alias: 'init',
			defalut: false,
			describe: '定义目标小程序路径',
			type: 'boolean'
		})
		.option('w', {
			alias: 'watch',
			default: false,
			describe: '监听项目文件更改',
			type: 'boolean'
		})
		.option('il', {
			alias: 'init-less',
			default: false,
			describe: '找到目标项目中所有的.wxss文件并在同级目录下复制生成相同内容的.less',
			type: 'boolean'
		})
		.option('f', {
			alias: 'force',
			default: false,
			describe: '类似git --force，强制运行有一定风险性的操作',
			type: 'boolean'
		})
		.help('h')
		.argv;

function runWatch(){
	fs.exists(config.project_path, function(exist){
		if(exist){
			console.log(`success: devtool 启动成功, 监听路径为: ${config.project_path}`);
			watchWorker(argv);
		}else{
			console.log(`error: 项目路径: ${argv.project_path} 不存在, 请输入项目的绝对路径`)
		}
	});
}

function runCommand(){
	if(process.argv.length > 2){
		commandWorker(argv);
	}else{ // 没有加参数，同-h命令
		child_process.exec(`${__dirname}/index.js -h`, function(err, stdout, stderr) {
			console.log(stdout);
		});
	}
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

		if(/^\//.test(projectPath)){
			fs.exists(projectPath, function(exist){
				if(exist){
					config['project_path'] = projectPath;
					fs.writeFile(`${__dirname}/config.json`, JSON.stringify(config), 'utf8', function(e){
						if(e){
							console.log(e);
							return
						}
						console.log(`success: 保存默认配置成功！目标小程序路径为：${projectPath}`);
						runWatch();
					})
				}else{
					console.log(`error: 项目路径: ${projectPath} 文件夹不存在`)
				}
			});
		}else{
			console.log(`error: ${projectPath} 路径不符合规范，请出入项目的本地绝对路径 如：/Users/your_username/wx-program`)
		}
	})
}else if(argv.w || argv.fa){
	runWatch();
}else{ // 其他命令
	runCommand();
}