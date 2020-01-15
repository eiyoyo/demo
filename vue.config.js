const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const IS_PROD = process.env.NODE_ENV === 'production' // 是否为生产环境

module.exports = {
  // 基本路径
  // baseUrl: './',//vue-cli3.3以下版本使用
  publicPath: './', // vue-cli3.3+新版本使用
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // 对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    // 生产环境配置
    if (IS_PROD) {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      // 移除 preload 插件
      config.plugins.delete('preload')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    if (IS_PROD) {
      // 为生产环境配置
      config.plugins.push(
        // 开启Gzip
        new CompressionPlugin({
          // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 5120, // 只有大小大于该值得资源会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }),
        // 打包时删除 debugger 和 console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: true,
          parallel: true
        })
      )
    }
  },
  css: {
    // 是否使用css分离插件
    extract: IS_PROD, // 是否使用 css 分离插件，默认生产环境下是 true，开发环境下是 false
    // 开启 CSS source maps，一般不建议开启
    sourceMap: process.env.NODE_ENV !== 'production',
    loaderOptions: {
      sass: {
        prependData: `
          // 全局变量
          @import "@/common/scss/theme.scss";
        `
      }
    }
  },
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    customer: {
      entry: 'src/pages/customer/customer.js',
      template: 'public/index.html',
      filename: 'customer.html',
      title: 'Customer Page',
      chunks: ['chunk-vendors', 'chunk-common', 'customer']
    },
    yeji: {
      entry: 'src/pages/yeji/yeji.js',
      template: 'public/index.html',
      filename: 'yeji.html',
      title: 'Yeji Page',
      chunks: ['chunk-vendors', 'chunk-common', 'yeji']
    }
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    hotOnly: true // 热更新
  }
}
