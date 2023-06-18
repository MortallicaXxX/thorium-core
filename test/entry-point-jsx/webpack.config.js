const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: path.resolve(__dirname, "src"),
  target: "web",
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "Thorium.js"
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    node: 'current',
                  }
                }],
                ["@babel/preset-react",
                {
                  "pragma": "DOM.render"
                }]
              ],
              plugins: ["@babel/plugin-syntax-jsx" , './babel-plugins/thorium-transform-plugin']
            },
          },
          {
            loader : 'ts-loader'
          }
        ]
      },
      {
        test: /\.(png|jpeg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { publicPath: "dist" }
          }
        ]
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: "native-addon-loader",
            options: { name: "[name]-[hash].[ext]" }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      process: "process/browser"
    },
    fallback: { 
      "path": require.resolve("path-browserify"),
      "fs": require.resolve("browserify-fs"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new webpack.ProvidePlugin({
      process: path.resolve(__dirname , 'node_modules/process/browser.js'),
      // buffer: path.resolve(__dirname , 'node_modules/buffer/index.js'),
      Buffer: [path.resolve(__dirname , 'node_modules/buffer/index.js'), 'Buffer'],
    }),
    // new webpack.ProvidePlugin({
    //   Buffer: path.resolve(__dirname , 'node_modules/buffer/index.js'),
    // }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    overlay: {
      warnings: false
    }
  }
};
