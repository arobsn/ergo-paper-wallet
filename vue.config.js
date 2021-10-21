/* eslint-disable @typescript-eslint/no-var-requires */
var webpack = require("webpack");
module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config
      .plugin("ignore")
      .use(new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\\src$/));

    config.plugin("standalone-html").use("html-webpack-plugin", [
      {
        filename: "standalone.html",
        template: "public/index.html",
        title: "Ergo Paper Wallet - Standalone Bundle",
        inlineSource: ".(js|css)$",
      },
    ]);

    config.plugin("html").tap((args) => {
      args[0].title = "Ergo Paper Wallet";
      return args;
    });

    config.plugin("inline-source").use("html-webpack-inline-source-plugin");
  },
};
