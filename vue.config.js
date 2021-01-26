const config = require('./server/config');
const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, './dist'),
  devServer: {
    // Override using: `npm run dev:client -- --port <number>`
    port: process.env.CLIENT_PORT || 8080,
    proxy: {
      '/api': {
        target: `http://${config.ip}:${config.port}`
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
