const webpack = require('webpack');

if (process.env.NODE_ENV === 'development') {
  process.env.REACT_APP_WEBSITE_TITLE = "Title - set it in github secrets";
  process.env.REACT_APP_WEBSITE_DESCRIPTION = "Description - set it in github secrets";
}

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  );

  return config;
};