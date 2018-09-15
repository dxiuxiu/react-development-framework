/**
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
        loader: "ts-loader"  //  以ts,tsx为后缀名的文件有ts-loader
      } 
    ]
  },
  
}
