// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const isProduction = process.env.NODE_ENV == "production";
const config = {
  entry: '/src/index.ts',
  devtool: 'source-map',
  output: {
    library: {
      name: 'MuddeCore',
      type: 'umd'
    },
    filename: 'core.js',
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "test"),
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  stats: {
    assets: true,
    colors: false,
    errors: true,
    errorDetails: true,
    hash: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      MuddeCore: path.resolve(__dirname, 'src/')
    },
  },
  optimization: {
    minimize: isProduction ? true : false,
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
