const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://airport-distance-backend.herokuapp.com',
      changeOrigin: true,
    })
  );
};