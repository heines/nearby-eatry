module.exports = {
  publicPath: '/nearby-eatry/',
  devServer: {
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
