var path = require("path");
var HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "build"),
        publicPath: '/build',
        filename: "index.js"
    },
    plugins: [
    new HtmlWebPackPlugin(),
    ],
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.tsx?/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.jsx?/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ["@babel/plugin-syntax-jsx"]
              },
            },
            exclude: /npm_modules/
          },
          {
            test: /\.s?css/,
            use: ["style-loader", "css-loader", "sass-loader"
            ],
          },
          {
            // Now we apply rule for images
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                // Using file-loader for these files
                loader: "file-loader",
                // loader: "url-loader",
                // In options we can set different things like format
                // and directory to save
                options: {
                  outputPath: '/images'
                }
              }
            ]
          },
          // {
          //   test: /\.(png|jpg)$/,
          //   loader: 'url-loader'
          // },
        ]
    },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, '/build/index.html'),
        },
      proxy: {
        '/': 'http://localhost:3000'
      },
      compress: true,
      port: 8080,
  },
};
