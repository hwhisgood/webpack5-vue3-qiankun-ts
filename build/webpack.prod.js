const { merge } = require('webpack-merge')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = (env) => {
  let pro_config = {
    mode: 'production',
    entry: {
      main: './src/main.ts'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: './js/[name].[contenthash].js',
      chunkFilename: './js/[name].[contenthash].js'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue$: 'vue/dist/vue.runtime.esm-bundler.js'
      },
      extensions: ['.js', '.ts', '.vue'] // 指定 Webpack 查找的文件扩展名
    },
    // module: {
      // 从common合并
    // },
    // 优化项
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(), // 对打包后的 .css 样式文件进行压缩
        new TerserPlugin({
          //  用于对打包后的 .js 文件进行压缩和混淆
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ],
      // 代码拆分
      splitChunks: {
        chunks: 'all', // 表示需要分割哪些代码块，默认值为 async，也就是只分割异步加载模块
        minSize: 20000, // 表示模块的最小尺寸（字节），当模块大于这个尺寸时才会进行分割，默认值为30000
        maxSize: 0, // 表示模块的最大尺寸（字节），当模块大于这个尺寸并且已经分割出来的代码块数量小于 `maxAsyncRequests` 时，会继续分割成更小的代码块，默认值为0，表示没有最大尺寸限制
        minChunks: 1, // 表示代码块被引入的最少次数，只有被引入次数大于等于这个数时，这个代码块才会被分割出去，默认值为1
        maxAsyncRequests: 8, // 表示同时加载的最大异步请求数量，默认值为5，建议不要设置得太大，否则可能会影响性能
        maxInitialRequests: 5, // 表示入口点的最大请求数量，默认值为3，建议不要设置得太大，否则可能会影响性能
        automaticNameDelimiter: '-', // 表示自动生成的名称之间的连接符，默认值为 ~，例如 vendors~main.js
        enforceSizeThreshold: 50000, // 表示是否强制执行尺寸限制，当被分割的代码块大于这个尺寸时，如果没达到最大请求数量或者没有超过 `maxSize` 时，仍然会进行分割
        // 表示缓存组，可以通过这个选项配置需要打包的代码块
        cacheGroups: {
          default: {
            // 表示通用的配置，例如引入的模块没有匹配到其他的缓存组时，会使用这个配置
            minChunks: 2, // 表示代码块被引入的最少次数，只有被引入次数大于等于这个数时，这个代码块才会被分割出去
            priority: -20, // 表示缓存组的优先级，数值越大越优先，默认值为 -20
            reuseExistingChunk: true // 表示是否重用已经存在的代码块，如果一个模块已经被打包成一个代码块了，再次引入直接使用这个代码块，而不是重新打包一个
          },
          vendor: {
            // 匹配 node_modules 下的第三方模块
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all', // 将入口文件和异步模块中用到的第三方库打包到同一个文件
            name: 'vendor',
            priority: -10 // 优先级更高
          },
          common: {
            // 匹配 src 目录下复用度较高的模块
            chunks: 'all',
            test: /[\\/]src[\\/]/,
            name: 'common',
            minChunks: 2, // 需要被引用两次及以上
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      // plugins: [
      //   new VueLoaderPlugin(),
      //   new MiniCssExtractPlugin({
      //     filename: 'css/[name].[contenthash].css',
      //     chunkFilename: 'css/[name].[contenthash].css'
      //   })
      // ]
    }
  }
  return merge(common(env), pro_config) //合并配置
}
