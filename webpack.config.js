const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname,'./src/index.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: "index.html"
        })
    ],
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是对那些文件生效
                test:/\.ts$/, // 通过正则表达式匹配文件的名字
                loader: 'ts-loader', // 通过ts-loader处理以ts结尾的文件
                exclude: /node_modules/, // 指定要排除的文件
                options: {
                    configFile: path.join(__dirname, './tsconfig.json')
                }
            }
        ]
    },
    devServer: {
        port:9000,
        static:path.join(__dirname, './dist')
    },
    // 用来设置哪些可以作为模块引入
    resolve:{
        extensions:['.ts','.js'] //以ts、js为后缀的文件可以作为模块引入，打包不报错
    }
}