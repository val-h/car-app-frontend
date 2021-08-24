module.exports = {
  devServer: {
    proxy: "https://car-app-django-rest.herokuapp.com/",
    port: 8080
  }
}
