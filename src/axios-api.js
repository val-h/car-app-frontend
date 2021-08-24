import axios from 'axios'
import store from './store'

const ax = axios.create({
  // eslint-disable-next-line quotes
  baseURL: "https://car-app-django-rest.herokuapp.com/",
  timeout: 1000
})

let isRefreshing = false

ax.interceptors.response.use(response => {
  return response
}, err => {
  if (err.response === undefined) {
    store.dispatch('userLogout')
    isRefreshing = false
  }

  const {
    config,
    response: { status, data }
  } = err

  if (status === 401 && data.messages[0].message === 'Token is invalid or expired') {
    store.dispatch('REFRESH_TOKEN')
      .then(({ status }) => {
        isRefreshing = true
        if (status === 200 || status === 204) {
          axios(config)
          isRefreshing = false
        }
      })
  }
  if (!isRefreshing && status === 401 && data.messages[0].message !== 'Token is invalid or expired') {
    store.dispatch('userLogout')
    isRefreshing = false
  }
})

export { ax }
