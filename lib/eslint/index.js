var config = require('../../config.json');

var child_process = require('child_process');

module.exports = function(filename, isFix = true){
	if(/\.js$/.test(filename)){ // js文件修改
		let command = `eslint ${__dirname}/../../../${config.project_name}/${filename}`;
		if(isFix){
			command += ' --fix'
		}
		child_process.exec(command, function(err, stdout, stderr){

			stdout ? console.log(stdout) : '';
			stderr ? console.log(stderr) : '';
		})
	}
};