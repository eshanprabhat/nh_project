const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    url: require.resolve("url"),
    // Add other polyfills here if needed
  };
  return config;
};
