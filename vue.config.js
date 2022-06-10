/**
 * css —— 自动引入 全局变量 和 混合mixin 样式
 */
module.exports = {
  productionSourceMap: false,
  publicPath: './', // 部署应用包时的基本 URL
  outputDir: 'dist', // 打包输出的文件夹名称
  assetsDir: 'static', // 静态文件存放地址
  devServer: {
    port: 4567,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/styles/variable.scss';
          @import '@/styles/mixins.scss';
          @import '@/styles/global.scss';
          @import '@/styles/font.scss';
        `
      }
    }
  },
  configureWebpack: config => {
    return {
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            elementPlus: {
              name: `chunk-element`,
              test: /[\\/]node_modules[\\/]_?element-plus(.*)/,
              priority: 20
            },
            echarts: {
              name: 'chunk-echarts',
              test: /[\\/]node_modules[\\/]_?echarts(.*)/,
              priority: 25
            }
          }
        }
      }
    }
  }
}
