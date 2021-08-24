export default {
  setUsers: (state, users) => {
    state.users = users
  },
  // FIXME could be used object destructuring
  setTokens (state, payload) {
    state.accessToken = payload.access
    state.refreshToken = payload.refresh
    state.userId = payload.userId
    localStorage.setItem('token', payload.access)
  },
  updateTokens (state, { access, refresh }) {
    state.accessToken = access
    state.refreshToken = refresh
  },
  setAccessToken (state, access) {
    state.accessToken = access
    localStorage.setItem('token', access)
  },
  setCurrentUser (state, user) {
    state.currentUser = user
  },
  destroyToken (state) {
    state.accessToken = null
    state.refreshToken = null
    state.userId = null
    state.currentUser = []
    localStorage.removeItem('token')
  },
  setIsLoading (state, condition) {
    state.isLoading = condition
  },
  setCars: (state, cars) => {
    state.cars = cars
  },
  setBrands: (state, brands) => {
    state.brands = brands
  },
  setModels: (state, models) => {
    state.models = models
  },
  setPosts: (state, posts) => {
    state.posts = posts
  },
  setSpecifications: (state, specifications) => {
    state.specifications = specifications
  },
  setPostImages: (state, images) => {
    state.imageLinks = images
  },
  setPostCarFeatures: (state, features) => {
    state.carFeatures = features
  },
  setTypes: (state, types) => {
    state.types = types
  },
  setBlogComments: (state, blog) => {
    state.blogComments = blog
  }
}
