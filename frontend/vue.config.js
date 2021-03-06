const BundleTracker = require("webpack-bundle-tracker");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/static/blog/webpack_bundles"
      : "http://127.0.0.1:8080",
  outputDir: "../blog/static/blog/webpack_bundles",

  chainWebpack: config => {
    config.optimization.splitChunks(false)
    config.plugin('BundleTracker').use(BundleTracker, [{ filename: './webpack-stats.json' }])
    config.output.filename("bundle.js")
    config.resolve.alias.set('__STATIC__', 'static')
  },
  devServer: {
    devMiddleware: {
      publicPath: "http://127.0.0.1:8080",
      writeToDisk: (filePath) => filePath.endsWith("index-dev.html"),
    },
    hot: "only",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  css: {
    extract: {
      filename: 'bundle.css',
      chunkFilename: 'bundle.css'
    },
  },
};
