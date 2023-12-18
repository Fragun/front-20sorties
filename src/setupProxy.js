const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "https://back-20sorties-ittp3j6dy-20-sorties.vercel.app/",
      //secure: false,
    })
  );
};
