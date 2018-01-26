# 微信小程序辅助cli工具

为微信小程序开发者提供附加的功能,支持命令行方式使用

### 目前支持的功能：

- .js脚本语法检测并自动修改不符合标准的语法
- .less文件在同级目录下转换为.wxss文件

### 环境要求：

请确认本机环境下已安装node.js环境，建议采用6.0.0以上的版本，确认命令：
```bash
    $ node -v
```

### 使用方法：

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

- 注册命令行命令，之后便可在命令行使用`wxapp-devtool`调用本工具
```
    $ npm link
```

### 命令详解：

#### 命令： `wxapp-devtool` 或 `wxapp-devtool -h`
##### 功能：

查看本工具支持的所有命令

##### 运行示例：
```
    $ wxapp-devtool
    Options:
      --version             Show version number                            [boolean]
      --fa, --fix-auto      开启后每次保存文件后对该文件运行eslint
                            --fix，本操作会更改文件的内容，本命令需配合-w命令一同使用，默认为false
                                                          [boolean] [default: false]
      --fp, --fix-prev      对最近一次编辑的有问题的.js文件运行eslint
                            --fix，本操作会更改文件的内容 [boolean] [default: false]
      --fm, --fix-modified  对git仓库下所有编辑过的文件运行eslint
                            --fix，本操作会更改文件的内容 [boolean] [default: false]
      -i, --init            定义目标小程序路径                             [boolean]
      -w, --watch           监听项目文件更改              [boolean] [default: false]
      -h                    Show help                                      [boolean]

```

#### 命令： `wxapp-devtool -i`

##### 功能：

指定小程序项目路径（初始化），指定你的小程序项目路径，这里需要注意的是必须输入本地磁盘下的根路径；输入路径合法后项目便会自动运行命令`wxapp-devtool -w`监听指定文件夹下的文件变动

##### 运行示例：

```
    $ wxapp-devtool -i
    ? 请输入小程序项目绝对路径 /Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
    保存默认配置成功！目标小程序路径为：/Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
    devtool 启动成功, 监听路径为: /Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
```

#### 命令： `wxapp-devtool -w`

##### 功能：

开启文件监听功能，监听路径为`wxapp-devtool -i`命令指定的文件目录

##### 备注：

在定义过一次小程序项目路径后，之后再次启动wxapp-devtool后不会再次询问，若想再次修改，可以再次使用命令`wxapp-devtool -i`重新定义

##### 运行示例：

```
    $ wxapp-devtool -w
    devtool 启动成功, 监听路径为: /Users/tingxuwang/Documents/code/test/weapp-devtool/weapp
```

#### 命令： `wxapp-devtool --fm`

##### 功能：

读取指定小程序项目中git仓库中记录的所有修改文件并对它们运行eslint --fix修改其中的语法错误，强烈建议在提交git仓库前使用此命令规范js代码

##### 运行示例：
```
    $ wxapp-devtool --fm
```

#### 命令： `wxapp-devtool -w --fa`

##### 功能：

开启自动fix功能，每次修改js文件后会自动调用eslint --fix命令对此文件执行语法纠错，此操作会修改文件本身的内容

##### 运行示例：
```
    $ wxapp-devtool -w --fa
```

### 其他说明：
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
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "space-before-function-paren": ["error", "always"],
    "no-mixed-spaces-and-tabs": [
      "error",
      "smart-tabs"
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