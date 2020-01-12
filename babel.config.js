module.exports = { 
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-decorators", { "legacy": true}],
      ["@babel/plugin-proposal-class-properties", { "loose": true}],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".tsx"],
          alias: {
            "assets": "./src/assets",
            "features": "./src/features",
            "components": "./src/components",
            "navigation": "./src/navigation",
            "store": "./src/store",
            "i18n": "./src/i18n",
          }
        }
      ]
  
    ]
};
