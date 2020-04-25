const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production"
}

module.exports = () => {
  const isProduction = process.env && process.env.RUN_ENV && process.env.RUN_ENV === ENV.PRODUCTION

  return {
    mode: isProduction ? ENV.PRODUCTION : ENV.DEVELOPMENT,
    entry: "./src/js/index.js",
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

        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].[hash].js'
    },
    devServer: {
      port: 3000
    }
  };
};
