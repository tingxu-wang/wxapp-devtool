# 微信小程序辅助cli工具

为微信小程序开发者提供附加的功能,支持命令行方式使用

目前支持的功能：

- .js脚本语法检测并自动修改不符合标准的语法
- .less文件在同级目录下转换为.wxss文件

环境要求：

请确认本机环境下已安装node.js环境，建议采用6.0.0以上的版本，确认命令：
```bash
    $ node -v
```

使用方法：

- 拷贝本项目到本地
```bash
    $ git clone https://github.com/tingxu-wang/wxapp-devtool.git
```

- 拷贝成功后来到本项目根路径下
```bash
    $ cd wxapp-devtool
```

- 安装依赖包：
```
    $ npm install
```

- 注册命令行命令
```
    $ npm link
```

- 执行成功后便可在命令行中使用wxapp-devtool命令执行本项目
```
    $ wxapp-devtool
```

- 执行命令后命令行会弹出问题，指定你的小程序项目路径，这里需要注意的是必须输入本地磁盘下的根路径，如：
```
    $ wxapp-devtool
    ? 请输入小程序项目绝对路径 /Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
```

- 输入路径合法后项目便会启动
```
    $ wxapp-devtool
    ? 请输入小程序项目绝对路径 /Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
    保存默认配置成功！目标小程序路径为：/Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
    devtool 启动成功, 监听路径为: /Users/tingxuwang/Documents/code/test/weapp-devtool/weapp

```

- 在定义过一次小陈股项目路径后，之后再次启动wxapp-devtool后不会再次询问，若想再次修改，可以使用以下命令重新定义
```
    $ wxapp-devtool -i
    ? 请输入小程序项目绝对路径
```

- 你可以使用`wxapp-devtool -h`命令查看支持的所有命令，如下
```
Options:
  --version   Show version number                                      [boolean]
  -f, --fix   是否开启js语法检测的文件修改功能，默认为true
                                                       [boolean] [default: true]
  -i, --init  定义目标小程序路径                                        [string]
  -h          Show help                                                [boolean]

```

若使用`wxapp-devtool -fix false`启动项目，会禁止eslint的fix功能，只报错

其他说明：
- 本项目的js语法校验功能采用eslint实现，需要在小程序项目目录下部署配置文件`.eslintrc.json`，若目标小程序项目下没有此文件，本工具会自动部署默认配置，你可以根据你的需要更改此文件，默认配置如下：
```json
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
      "getApp": true,
      "Page": true,
      "wx": true
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ]
    }
}
```