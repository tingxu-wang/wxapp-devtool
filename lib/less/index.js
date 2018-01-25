/**
 * Created by tingxuwang on 02/01/2018.
 * 根据lessPath对应的less文件在同级目录下生成对应的wxss文件
 */

const fs = require('fs'),
	path = require('path'),
	less = require('less');

const config = require('../../config.json');

module.exports = function(lessPath) {
	const dirname = path.dirname(lessPath),
		basename = path.basename(lessPath, '.less'),
		extname = path.extname(lessPath);

	if(extname === '.less'){
		fs.readFile(`${__dirname}/../../../${config.project_name}/${lessPath}`, 'utf8', function(e,content){
			if(e){
				console.log(e);
				return
			}

			less.render(content, function(e, output){
				if(e){
					console.log(e);
					return
				}

				console.log(`rendering ${basename}.less to ${basename}.wxss`)
				fs.writeFile(`${__dirname}/../../../${config.project_name}/${dirname}/${basename}.wxss`, output.css, 'utf8', function(e){
					if(e){
						console.log(e);
						return
					}
					console.log(`update ${basename}.wxss finish`)
				});
			})
		});
	}
};