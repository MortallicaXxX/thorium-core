const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.NODE_ENV || "development",
  entry: path.resolve(__dirname, "src"),
  // target: "web",
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "Thorium.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpeg|gif|svg)$/i,
        use : [
          { loader: 'file-loader' }
        ],
        // type : 'asset/resource'
      },
      // {
      //   test: /\.node$/,
      //   use: [
      //     {
      //       loader: "native-addon-loader",
      //       options: { name: "[name]-[hash].[ext]" }
      //     }
      //   ]
      // },
      {
        test: /\.css$/,
        use : [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' } , 
          { loader: 'postcss-loader' } , 
        ]
      }
    ]
  },
  resolve: {
    fallback: {
      'fs': require.resolve("browserify-fs"),
      'util' : require.resolve("util/"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [new CleanWebpackPlugin({
    dangerouslyAllowCleanPatternsOutsideProject: true
  })]
};
