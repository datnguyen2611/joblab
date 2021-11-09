const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/**', 
    createProxyMiddleware({ 
      timeout: 6000000,
      proxyTimeout: 6000000,
      target: 'http://localhost:8082'
  }));
  app.use(
    '/ws/**',  
    createProxyMiddleware({ 
    target: 'http://localhost:8082', ws: true
  }));
};