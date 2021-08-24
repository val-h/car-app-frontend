import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state.js'
import actions from '@/store/actions.js'
import mutations from '@/store/mutations.js'
import getters from '@/store/getters.js'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ encodingType: 'rc4', isCompression: true })

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    })
  ],
  mutations,
  actions,
  getters
})
