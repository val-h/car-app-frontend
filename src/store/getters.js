export default {
  logged_in (state) {
    return state.accessToken != null
  },
  get_cars (state) {
    return state.cars
  },
  get_brands (state) {
    return state.brands
  },
  models (state) {
    return state.models
  },
  models_by_brand_id: (state) => (brandId) => {
    return state.models.filter(model => model.brand.id === brandId)
  },
  models_by_id: (state) => (modelId) => {
    return state.models.filter(model => model.id === modelId)
  },
  get_users (state) {
    return state.users
  },
  get_access_token (state) {
    return state.accessToken
  },
  is_loading (state) {
    return state.isLoading
  },
  refresh_token (state) {
    return state.refreshToken
  },
  get_posts (state) {
    return state.posts
  },
  user_id (state) {
    return state.userId
  },
  current_user (state) {
    return state.currentUser
  },
  get_post_images (state) {
    return state.imageLinks
  },
  get_post_features (state) {
    return state.carFeatures
  },
  get_post_by_id: (state) => (id) => {
    return state.posts.filter(posts => posts.id === id)
  },
  get_image_links_by_id: (state) => (id) => {
    return state.imageLinks.filter(links => links.post.id === id)
  },
  get_features_by_id: (state) => (id) => {
    return state.carFeatures.filter(feature => feature.post.id === id)
  },
  get_types (state) {
    return state.types
  },
  specifications (state) {
    return state.specifications
  },
  is_staff (state) {
    return state.currentUser.is_staff
  }
}
