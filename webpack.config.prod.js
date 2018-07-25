const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.js", //入口
  output: {
    //出口
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|woff|svg|eot|jpg|png)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      //适合 vue-loader 14.x
      //{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }

      //如果是的vue-loader 是15.x 
      //参考https://vue-loader.vuejs.org/zh/migrating.html#%E4%BB%8E%E4%BE%9D%E8%B5%96%E4%B8%AD%E5%AF%BC%E5%85%A5%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      }
    ]
  },
  resolve: {
    extensions: [".vue", ".js", ".json"]
  },
  // devtool: '#cheap-module-eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html", //模版，指定参考文件
      minify:{
        removeComments:true, //删除注释
        minifyCSS:true,//压缩css
        minifyJS:true,//压缩js
        collapseWhitespace:true//压缩空格
      }
    }),
    //全局的导入jquery
    new webpack.ProvidePlugin({
      $: "jquery", //key代表的将来使用jquery时候的变量名称，值是包的名称
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      //设置当前环境为生产环境
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      //压缩bundle.js
      compress: {
        warnings: false,
        drop_debugger: true, //去除调试
        drop_console: true  //去除console
      },
      output: {
        comments: false //去除copyright
      }
    })
  ]
};
