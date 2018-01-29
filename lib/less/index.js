/**
 * Created by tingxuwang on 02/01/2018.
 * 根据lessPath对应的less文件在同级目录下生成对应的wxss文件
 */

const fs = require('fs'),
	path = require('path'),
	less = require('less');

var config = require('../../config.json');

var findFilesInDir = require('../util/find-files');

module.exports = {
	command: function(argv) {
		if(argv.il){ // init-less
			var lessFiles = findFilesInDir(config.project_path, '.wxss') || [];
			if(lessFiles.length > 0){
				lessFiles.forEach(function(filePath){
					var dirname = path.dirname(filePath),
						basename = path.basename(filePath, '.wxss');

					var lessFilePath = `${dirname}/${basename}.less`;

					fs.exists(lessFilePath, function(exists){
						if(exists && !argv.force){
							console.log(`warn: ${lessFilePath} 文件已存在，跳过此文件`);
						}else{
							fs.createReadStream(filePath).pipe(fs.createWriteStream(lessFilePath));
							console.log(`success: ${lessFilePath} 创建成功`);
						}
					});
				});
			}
		}
	},
	watch: function(lessPath, argv) {
		var dirname = path.dirname(lessPath),
			basename = path.basename(lessPath, '.less'),
			extname = path.extname(lessPath);

		if(extname === '.less'){
			fs.readFile(`${config.project_path}/${lessPath}`, 'utf8', function(e,content){
				if(e){
					console.log(e);
					return
				}

				less.render(content, function(e, output){
					if(e){
						console.log(e);
						return
					}

					console.log(`转换 ${basename}.less 为 ${basename}.wxss`);
					var wxssPath = `${config.project_path}/${dirname}/${basename}.wxss`;
					fs.writeFile(wxssPath, output.css, 'utf8', function(e){
						if(e){
							console.log(e);
							return
						}
						console.log(`success: ${wxssPath} 更新成功`)
					})
				})
			});
		}
	}
};

