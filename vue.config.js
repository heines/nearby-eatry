module.exports = {
  publicPath: '/nearby-eatry/',
  devServer: {
    https: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    proxy: {
      "/api_domain": {
        target: "https://maps.googleapis.com",
        pathRewrite: {
          '^/api_domain' : '/'
        }
      }
    }
  }
}
