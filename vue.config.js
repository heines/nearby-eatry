module.exports = {
  publicPath: '/nearby-eatry/',
  devServer: {
    host: "localhost",
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
