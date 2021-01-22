const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, './dist'),
  devServer: {
    proxy: {
      '/api': {
        target: process.env.API_PATH || 'http://localhost:5000'
      }
    }
  },
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./client/main.js')
      .end();
    config.resolve.alias
      .set('@', path.join(__dirname, './client'));
  }
};
