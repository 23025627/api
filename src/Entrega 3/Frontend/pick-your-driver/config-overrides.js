const path = require('path');

module.exports = {
  webpack: function (config, env) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http: require.resolve('stream-http'),
      stream: require.resolve('stream-browserify')  // Adicionando o polyfill para stream
    };
    return config;
  },
};
