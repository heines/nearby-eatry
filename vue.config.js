module.exports = {
  publicPath: '/nearby-eatry/',
  outputDir: 'docs',
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
