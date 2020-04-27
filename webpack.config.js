const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
}

module.exports = () => {
  const isProduction = process.env && process.env.RUN_ENV && process.env.RUN_ENV === ENV.PRODUCTION

  return {
    mode: isProduction ? ENV.PRODUCTION : ENV.DEVELOPMENT,
    entry: [
      __dirname + "./src/js/index.js",
      __dirname + "./src/styles/styles.scss"
    ],
    resolve: { extensions: [".js", ".jsx"] },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader"
          }
        },
        {
          test: /\.(sa|sc|c)css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: {
                path: __dirname + "./postcss.config.js"
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/[name].[hash].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "styles/[name].[hash].css" : "styles/[name].css",
        chunkFilename: isProduction ? "styles/[id].[hash].css" : "styles/[id].css"
      })
    ],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'js/[name].[hash].js'
    },
    devServer: {
      port: 3000
    }
  };
};
