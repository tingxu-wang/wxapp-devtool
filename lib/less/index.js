/**
 * Created by tingxuwang on 02/01/2018.
 * 根据lessPath对应的less文件在同级目录下生成对应的wxss文件
 */

const fs = require('fs'),
	path = require('path'),
	less = require('less');

var config = require('../../config.json');

module.exports = function(lessPath) {
	const dirname = path.dirname(lessPath),
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
					console.log(`${wxssPath} 更新成功`)
				})
			})
		});
	}
};