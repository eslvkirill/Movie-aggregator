const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  console.log(app);
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
