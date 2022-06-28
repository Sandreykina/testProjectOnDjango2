// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? '/static/dist/' : 'http://127.0.0.1:8080',
//   outputDir: '../static/dist',
//   indexPath: '../../blog/templates/base-vue.html', // relative to outputDir!

//   devServer: {
//     devMiddleware: {
//       publicPath: "http://127.0.0.1:8080",
//       writeToDisk: (filePath) => filePath.endsWith("index.html"),
//     },
//     hot: "only",
//     headers: { "Access-Control-Allow-Origin": "*" },
//   },
// }

const BundleTracker = require("webpack-bundle-tracker");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/static/assets/dist/"
      : "http://127.0.0.1:8080",
  // publicPath: "http://127.0.0.1:8080",
  outputDir: "../assets/dist",

  chainWebpack: config => {
    config.optimization.splitChunks(false)
    config.plugin('BundleTracker').use(BundleTracker, [{ filename: './webpack-stats.json' }])
    config.output.filename("bundle.js")
    config.resolve.alias.set('__STATIC__', 'static')
  },
  devServer: {
    devMiddleware: {
      publicPath: "http://127.0.0.1:8080",
      writeToDisk: (filePath) => filePath.endsWith("index.html"),
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
