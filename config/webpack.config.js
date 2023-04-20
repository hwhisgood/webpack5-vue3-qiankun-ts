const path = require('path') // 引用path模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
const webpack = require('webpack')
const envMode = process.env.envMode
require('dotenv').config({ path: `.env` }) //这个的作用是执行根目录下的.env文件，把里面的变量放到process.env上
require('dotenv').config({ path: `.env.${envMode}` }) //这个的作用是执行根目录下的.env.${envMode}文件，把里面的变量放到process.env上,和.env相同的部分会覆盖它
console.log('-------', envMode)

// 正则匹配以 VUE_APP_ 开头的 变量
const prefixRE = /^VUE_APP_/
let env = {}
// 只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中
for (const key in process.env) {
  if (key == 'NODE_ENV' || key == 'BASE_URL' || prefixRE.test(key)) {
    env[key] = JSON.stringify(process.env[key])
  }
}

console.log('----', process.env.envMode)
module.exports = {
  entry: path.resolve(__dirname, '../src/main.ts'), // 入口文件，打包从这个文件开始
  output: {
    path: path.resolve(__dirname, '../dist'), //出口文件，打包生成的文件放置到这个文件夹下
    filename: './js/[name].[chunkhash].js' //打包成的文件名。name取的原始文件名，chunkhash生成哈希值，这样每次打包出来不一样，避免浏览器缓存读取旧文件。
  },
  mode: 'development', //开发模式
  devServer: {
    // historyApiFallback: true,
    // noInfo: true
    hot: true, //模块的热替换
    open: true, // 编译结束后自动打开浏览器
    port: 8880, // 设置本地端口号
    host: 'localhost' //设置本地url
  },
  // ...其他配置
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html', //用来做模板的html的文件路径(从项目根目录开始)
      filename: 'index.html', //生成的html的名字
      title: 'webpack5的项目配置', //这个就对应上文的title
      inject: 'body' //打包出来的那个js文件，放置在生成的body标签内
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          },
          // other vue-loader options go here
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      // vue$: 'vue/dist/vue.esm.js'
    }
  }
}
