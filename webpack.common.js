const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/js/index",
    login: "./src/js/login"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              removeComments: false,
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "../images",
              outputPath: "images"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "../fonts",
              outputPath: "fonts"
            }
          }
        ]
      },
      { test: /\.vue$/, use: ["vue-loader"] },
      { test: /\.ts$/, use: "ts-loader" }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "index"],
      filename: "index.html",
      template: "src/pug/index.pug"
    }),
    new HtmlWebpackPlugin({
      chunks: ["vendor", "login"],
      filename: "login.html",
      template: "src/html/login.html"
    }),
    new ManifestPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css?id=[chunkhash]",
      chunkFilename: "css/vendor.css"
    }),
  ],
  output: {
    filename: "js/[name].js?id=[chunkhash]",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: "initial",
      name: "vendor"
    }
  },
  mode: "production",
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  }
};
