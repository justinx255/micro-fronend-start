const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3003,
    historyApiFallback: {
      index: "index.html",
    },
    // hot: "only",
  },
  output: {
    publicPath: "auto",
    chunkFilename: "[id].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".css"],
    alias: { events: "events" },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "sales",
      filename: "remoteEntry.js",
      remotes: {
        shell: "shell@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./TodayWidget": "./src/TodayWidget",
        "./DepositsWidget": "./src/DepositsWidget",
      },
      shared: [
        // ...deps,
        // react: {
        //   eager: true,
        //   singleton: true,
        //   requiredVersion: deps.react,
        // },
        // "react-dom": {
        //   eager: true,
        //   singleton: true,
        //   requiredVersion: deps["react-dom"],
        // },
        "react","react-dom"
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
