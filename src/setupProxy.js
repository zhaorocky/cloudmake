const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://1.116.37.178:8090',
      changeOrigin: true,
    })
  );
};
