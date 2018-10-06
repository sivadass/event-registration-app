const path = require("path");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWbepackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const webpackCommon = require("./webpack.common");

const pathsToClean = ["dist"];
const cleanOptions = {
  root: path.resolve(__dirname, "/dist")
};

module.exports = merge.smart(webpackCommon, {
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "/"
  },
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            keep_fnames: true
          }
        }
      })
    ],
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWbepackPlugin(pathsToClean, cleanOptions),
    new MomentLocalesPlugin(),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./favicon.ico",
        to: "favicon.ico",
        context: "./",
        toType: "file",
        force: true
      },
      {
        from: "./_redirects",
        to: "_redirects",
        context: "./",
        toType: "file",
        force: true
      }
    ])
  ]
});
