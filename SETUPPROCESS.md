**记录了我从零开始搭建react开发框架的过程**
webpack4+react16 + less
#初始化项目
yarn init
# 必要安装包
## 安装webpack相关依赖
yarn add webpack webpack-cli -D
## 安装webpack-dev-serevr
yarn add webpack-dev-server -D
## 安装react相关依赖
yarn add react react-dom react-router react-router-dom 
## 安装ts语法支持
yarn add typescript ts-loader 
## 安装 cross-env-解决设置NODE_ENV变量跨平台问题
### 安装
yarn add cross-env -D

## 添加测试代码
项目结构如下
<pre>
  |--react-development-framework
          |--src
             |--compontents
                |--Test
                   |--index.tsx
             |--root.tsx
          |--index.html
          |--webpack.config.js
          |--package.json
          |--tsconfig.json
          |--......
</pre> 

# 基于以上必要安装包的webpack.config.js的配置和package.json的配置
webpack.config.js
``` javascript
/**
 * const isProduction = process.env.NODE_ENV === 'production' 
 * 作用说明：是不是生产环境,
 * 依赖及原理说明：本来在windows和linux下完成该配置需要不同的写法，
 * 但是在安装cross-env后这里的配置既可以在windows下正确运行也可在linux下正常运行，
 * 即常说的跨平台
 * cross-env详情参考 : https://blog.csdn.net/qq_26927285/article/details/78105510
 */
const isProduction = process.env.NODE_ENV === 'production' 
const path = require("path");

module.exports = {
  mode: 'development',
  // 入口文件设置
  entry: {
    index: ["./src/root.tsx"], //入口文件，若不配置将自动查找src目录下的index.js文件
  },
  output: {
    filename: "js/[name].bundle.js", //输出文件名，[name]表示入口文件js名
    path: path.resolve(__dirname, 'build/dist/'), // 输出路径
  },
  resolve: { 
    extensions: [".ts", ".tsx", ".js", "jsx"], // 作用：以ts,tsx,js,jsx为后缀名的文件在引入时不需要加后缀名
  },
  devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader"  //  以ts,tsx为后缀名的文件有ts-loader处理
      } 
    ]
  },
}
```
package.json 
```json
{
 "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server",
    "build": "cross-env NODE_ENV=production webpack"
  },
}
```

+ 这时运行yarn start 命令会发现报错，大意就是tsconfig.json文件不存在，原来typescript语法支持下需要一个tsconfig.json文件，那么新建一个即可。添加配置即可，此时tsconfig.json如下：
```json
{
    "compilerOptions": {
      "outDir": "./dist/",
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```
+ 然后我们会继续发现ts报错，此时根据报错提示做后续操作即可，比如我的提示安装一些包    
npm install @types/react 对应的yarn 命令为 yarn add @types/react;    
npm install @types/react-dom 对应的yarn 命令为 yarn add @types/react-dom    
而我执行的是yarn add @types/react-dom -D和 yarn add @types/react -D,多一个-D是说明对应安装包是开发依赖，没有-D则是生产依赖。
+ 还有报错，import  React from 'react' 会报错，这时将其修改为import * as  React from 'react'即可

+ 解决掉所有报错后继续yarn build，执行完成之后项目结构如下
<pre>
  |--react-development-framework
          |--build
             |--dist
                |--js
                   |--index.bundle.js
                   |--index.bundle.js.map
          |--src
             |--compontents
                |--Test
                   |--index.tsx
             |--root.tsx
          |--index.html
          |--webpack.config.js
          |--package.json
          |--tsconfig.json
          |--......
</pre> 
经过build前后对比发现build会生成一个新的文件夹，我这里叫build，也可以是其他名称可以根据需要在webpack.config.js中自定义，同时在该目录的dist文件夹下生成了两个文件index.bundle.js和index.bundle.js.map，这里的index.bundle.js.map文件不用管，根据js文件生成路径在项目根目录下的index.html文件夹中配置js文件引入路径，如我这里的<script src='./build/dist/js/index.bundle.js'></script>
+ yarn start 会提示 Project is running at http://localhost:XXXX/,此时在浏览器访问对应地址即可看到测试内容，如果提示js文件找不到就是你在html中文件引入路径出了问题