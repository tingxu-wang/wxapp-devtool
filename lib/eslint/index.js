var config = require('../../config.json');

var child_process = require('child_process'),
	fs = require('fs');

module.exports = function(filename, argv){
	if(/\.js$/.test(filename)){ // js文件修改
		var project_path = config.project_path;

		function runEslint(){
			let command = `eslint ${project_path}/${filename}`;
			if(argv.fix){
				command += ' --fix'
			}
			child_process.exec(command, function(err, stdout, stderr){

				stdout ? console.log(stdout) : '';
				stderr ? console.log(stderr) : '';
			})
		}

		fs.exists(`${project_path}/.eslintrc.json`, function(exists){
			if(!exists){
				var rd = fs.createReadStream(`${__dirname}/eslintrc-default.json`),
					wr = fs.createWriteStream(`${project_path}/.eslintrc.json`);

				rd.pipe(wr);

				wr.on('error', function(err){
					console.log(err);
				});
				wr.on('close', function(){
					runEslint();
				});
			}else{
				runEslint();
			}
		});
	}
};