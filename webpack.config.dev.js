const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js', //入口
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|woff|svg|eot|jpg|png)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        overlay: true //如果有错误，在页面中弹出一个遮罩层，错误的提示显示在上面
    },
    resolve: {
        extensions: [".vue", ".js", ".json"]
    },
    // devtool: '#cheap-module-eval-source-map',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './template.html' //模版，指定参考文件
        }),
        //全局的导入jquery
        new webpack.ProvidePlugin({
            $: "jquery", //key代表的将来使用jquery时候的变量名称，值是包的名称
            jQuery: "jquery"
        })
    ]
}