const registerRouter = require("./backend/router");

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `,
      },
    },
  },
  devServer: {
    onBeforeSetupMiddleware(app) {
      registerRouter(app.app);
    },
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin =
        require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? "/music-next/" : "/",
};
