import { ax } from '../axios-api'
import store from '../store/index'

// FIXME  Authorization headers should be set in axios plugin once.
// FIXME  Too much console.logging and missing error handling
export default {
  async loadUsers ({ commit }) {
    // FIXME  Filters for users should be passed as objects or handled in BE
    try {
      await ax.get('/api/users/?is_active=true&is_staff=false', {
        headers: {
          Authorization: `Bearer ${store.state.accessToken}`
        }
      })
        .then((response) => {
          return commit('setUsers', response.data)
        })
    } catch (error) {
      console.log('Unexpected problem')
    }
  },
  async loadCurrentUser ({ commit }, payload) {
    if (payload.userId !== null) {
      console.log(payload)
      try {
        await ax.get('/api/users/' + payload.userId + '/?format=json', {
          headers: {
            Authorization: `Bearer ${store.state.accessToken}`
          }
        })
          .then(response => {
            commit('setCurrentUser', response.data)
          })
      } catch (error) {
        console.log("Couldn't load current user")
      }
    } else {
      console.log("else Couldn't load current user")
    }
  },
  async userLogin (context, userCredentials) {
    try {
      await ax.post('api-token-auth/', {
        username: userCredentials.username,
        password: userCredentials.password
      })
        .then(response => {
          console.log(response)
          context.commit('setTokens', {
            access: response.data.access,
            refresh: response.data.refresh,
            userId: response.data.user_id
          })
        })
    } catch (error) {
      // FIXME  no error handling on login
    }
  },
  userRegister (context, userCredentials) {
    ax.post('api/register/', {
      username: userCredentials.username,
      password: userCredentials.password
    })
  },
  reauthenticate (context, { accessToken, refreshToken }) {
    context.commit('updateTokens', {
      access: accessToken,
      refresh: refreshToken
    })
  },
  userLogout (context) {
    if (store.getters.logged_in) {
      context.commit('destroyToken')
      sessionStorage.clear()
    }
  },
  async loadBrands ({ commit }) {
    await ax.get('brands/?format=json', {
    })
      .then((response) => {
        commit('setBrands', response.data)
      })
  },
  async loadModels ({ commit }) {
    try {
      await ax.get('models/?format=json', {
      })
        .then((response) => {
          commit('setModels', response.data)
        })
    } catch (error) {
      console.log('Couldnt load models')
    }
  },
  async loadPosts ({ commit }) {
    try {
      await ax.get('api/post/?format=json', {
      })
        .then((response) => {
          commit('setPosts', response.data)
        })
    } catch (error) {
      console.log('Couldnt load posts')
    }
  },
  async loadSpecificationTypes ({ commit }) {
    try {
      await ax.get('api/type/?format=json', {
      })
        .then((response) => {
          commit('setTypes', response.data)
        })
    } catch (error) {
      console.log('Couldnt load specifications types')
    }
  },
  async loadSpecifications ({ commit }) {
    try {
      await ax.get('api/specification/?format=json', {
      })
        .then((response) => {
          commit('setSpecifications', response.data)
        })
    } catch (error) {
      console.log('Couldnt load specifications')
    }
  },
  REFRESH_TOKEN: async ({ commit }) => {
    try {
      return await ax.post('api-token-refresh/', {
        refresh: store.getters.refresh_token
      })
        .then(response => {
          commit('setAccessToken', response.data.access)
        })
    } catch (error) {
      console.log('Couldnt refresh token')
    }
  },
  async createPost ({ commit }, { formData }) {
    commit('setIsLoading', true)
    await ax.post('/api/post/create/', {
      model: formData.model,
      price: formData.price,
      description: formData.description,
      phone_number: formData.phoneNumber,
      photos_upload: formData.images,
      specifications: formData.specifications
    },
    {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
  },
  async deletePost ({ commit }, postId) {
    await new Promise((resolve, reject) => {
      ax.delete('/api/post/' + postId + '/',
        {
          headers: {
            Authorization: `Bearer ${store.state.accessToken}`
          }
        })
    })
  },
  async loadBlogComments ({ commit }) {
    await ax.get('blog/', {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(response => {
        commit('setBlogComments', response.data)
      })
  },
  async postCommentOnModel ({ commit }, { model, comment }) {
    const commentId = await ax.post('comment/create', {
      comment: comment
    }, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(response => {
        return response.data.id
      })
    try {
      const currentBlog = store.getters.getBlogByModelId(model)[0]
      const commentsArray = []
      currentBlog.comments.forEach(com => {
        commentsArray.push(com.id)
      })
      commentsArray.push(commentId)

      await ax.put('blog/' + currentBlog.id + '/', {
        model: model,
        comments: commentsArray
      }, {
        headers: {
          Authorization: `Bearer ${store.state.accessToken}`
        }
      })
      store.dispatch('loadBlogComments')
    } catch (error) {
      if (error) {
        await ax.post('blog/create', {
          model: model,
          comments: [commentId]
        },
        {
          headers: {
            Authorization: `Bearer ${store.state.accessToken}`
          }
        })
        store.dispatch('loadBlogComments')
      }
    }
  },
  async deleteComment ({ commit }, commentId) {
    await ax.delete('comment/' + commentId, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .catch(err => {
        return err
      })
    store.dispatch('loadBlogComments')
  },
  async updateComment ({ commit }, { commentId, newComment }) {
    await ax.put('comment/' + commentId,
      {
        comment: newComment
      },
      {
        headers: {
          Authorization: `Bearer ${store.state.accessToken}`
        }
      })
      .catch(err => {
        if (err) {

        }
      })
  }
}
