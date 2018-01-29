var globalConfig = require('../../config.json'),
	config = require('./config.json');

var project_path = globalConfig.project_path;

var child_process = require('child_process'),
	fs = require('fs');

function fixFile(filePath){
	return new Promise(function(resolve, reject){
		child_process.exec(`eslint ${filePath} --fix`, function(err, stdout, stderr){
			stdout ? console.log(stdout) : '';
			stderr ? console.log(stderr) : '';
			console.log(`success: ${filePath} fix complete`);
			resolve();
		});
	});
}

// 没有eslint配置文件的话，发布默认配置到目标项目根目录
function checkEslintrc(){
	return new Promise(function(resolve){
		fs.exists(`${project_path}/.eslintrc.json`, function(exists){
			if(!exists){
				var rd = fs.createReadStream(`${__dirname}/eslintrc-default.json`),
					wr = fs.createWriteStream(`${project_path}/.eslintrc.json`);

				rd.pipe(wr);

				wr.on('error', function(err){
					console.log(err);
				});
				wr.on('close', function(){
					resolve();
				});
			}else{
				resolve();
			}
		});
	});
}

module.exports = {
	command : function(argv){
		if(argv.fp){ // fix-prev
			var prevPath = config.prev_error_js;
			if(prevPath){
				fs.exists(prevPath, function(exist){
					if(exist){
						fixFile(prevPath).then(function(){
							config['prev_error_js'] = '';
							fs.writeFile(`${__dirname}/config.json`, JSON.stringify(config), 'utf8');
						});
					}else{
						console.log(`error: ${prevPath} 文件不存在`);
					}
				});
			}else{
				console.log('没有出错文件缓存');
			}
		}else if(argv.fm){ // fix-modified
			fs.exists(`${project_path}/.git`,function(exist){
				if(exist){
					child_process.exec(`cd ${project_path} && git ls-files -m | grep '\.js$'`, function(err, stdout, stderr){
						if(stdout){
							var filePaths = stdout.split('\n')
							.filter(function(item){
								return item != false;
							})
							.map(function(item){
								return `${project_path}/${item}`;
							}).join(' ');

							checkEslintrc().then(function(){
								fixFile(filePaths);
							})
						}else{
							console.log('warn: 没有找到git modified过的文件');
						}
					});
				}else{
					console.log(`error: ${project_path} 下没有定义git仓库`)
				}
			});
		}
	},
	watch : function(filename, argv){ // 文件监听功能
		if(/\.js$/.test(filename)){ // js文件修改
			function runEslint(){
				const filePath = `${project_path}/${filename}`;
				let command = `eslint ${filePath}`;

				child_process.exec(command, function(err, stdout, stderr){
					if(stdout){
						console.log(stdout);
						if(argv.fa){
							child_process.exec(`eslint ${filePath} --fix`, function(){
								console.log(`${filePath} auto-fix完成`);
							});
						}else{
							config['prev_error_js'] = filePath;
							fs.writeFile(`${__dirname}/config.json`, JSON.stringify(config), 'utf8');
						}
					}else{
						console.log('success: 没有检测到语法问题，赞 (●ﾟωﾟ●)');
					}

					stderr ? console.log(stderr) : '';
				})
			}

			checkEslintrc().then(function(){
				runEslint();
			})
		}
	}
};