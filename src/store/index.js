import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: '',
    admin: false
  },
  getters: {
    getLoggedStatus: state => state.logged,
    getAdminPrivileges: state => state.admin
  },
  mutations: {
    setAdmin(state, payload) {
      state.admin = payload;
    },
    setLogged(state, payload) {
      state.logged = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
