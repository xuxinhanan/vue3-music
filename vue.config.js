const registerRouter = require('./backend/router')

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // 利用CSS插件自动注入全局变量样式
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    onBeforeSetupMiddleware(app) {
      registerRouter(app.app)
    }
  },
  configureWebpack: config => {
    /**
     * 添加打包速度、大小分析工具。
     * 使用方式在打包命令后面添加 --report。
     * 如：npm run build --report
     */
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin =
        require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
      config.plugins.push(new BundleAnalyzerPlugin())
      config.plugins.push(new SpeedMeasurePlugin())
    }
    /** ---------------------------------------------- */

    let cache = {
      type: 'filesystem'
    }

    Object.assign(config, {
      cache
    })
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
}
