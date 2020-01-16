const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 对js文件进行压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析
const isProduction = process.env.NODE_ENV === 'production' // 是否为生产环境
// const IS_ANALYZ = 'analyz' // 打开打包分析
const IS_ANALYZ = '' // 关闭打包分析，正式上线时请关闭！不然会增加打包体积。
// 生产环境使用CDN引入vant
const cdn = {
  css: [
    'https://cdn.jsdelivr.net/npm/vant@2.4/lib/index.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vant@2.4/lib/vant.min.js'
  ]
}

module.exports = {
  // 基本路径
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
  chainWebpack: (config) => {
    // 生产环境配置
    if (isProduction) {
      let entryNames = ['index', 'customer', 'yeji']
      entryNames.forEach(entryName => {
        // 移除 prefetch 插件
        config.plugins.delete(`prefetch-${entryName}`)
        // 移除 preload 插件
        config.plugins.delete(`preload-${entryName}`)
        // 生产环境注入cdn
        config.plugin(`html-${entryName}`)
          .tap(args => {
            args[0].cdn = cdn
            args[0].xhtml = true
            args[0].minify = {
              removeAttributeQuotes: false,
              keepClosingSlash: true,
              collapseWhitespace: true,
              preserveLineBreaks: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            }
            return args
          })
      })
      // 打包分析
      if (IS_ANALYZ) {
        config.plugin('webpack-report')
          .use(BundleAnalyzerPlugin, [{
            analyzerMode: 'static'
          }])
      }
      // ============压缩图片 start============
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
      // ============压缩图片 end============
    }
  },
  // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    if (isProduction) {
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
      // 生产环境用cdn方式引入插件
      config.externals = {
        vue: 'Vue',
        vant: 'vant'
      }
    }
  },
  css: {
    // 是否使用css分离插件
    extract: isProduction, // 是否使用 css 分离插件，默认生产环境下是 true，开发环境下是 false
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
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    customer: {
      entry: 'src/pages/customer/customer.js',
      template: 'public/index.html',
      filename: 'customer.html',
      chunks: ['chunk-vendors', 'chunk-common', 'customer']
    },
    yeji: {
      entry: 'src/pages/yeji/yeji.js',
      template: 'public/index.html',
      filename: 'yeji.html',
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
