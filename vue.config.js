module.exports = {
  devServer: {
    https: true,
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
