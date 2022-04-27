import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: true,
    user: 'Michał',
    admin: true
  },
  getters: {
    getLoggedStatus: state => state.logged,
    getAdminPrivileges: state => state.admin,
    getUser: state => state.user,
  },
  mutations: {
    setAdminPrivileges(state, payload) {
      state.admin = payload;
    },
    setLoggedStatus(state, payload) {
      state.logged = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
