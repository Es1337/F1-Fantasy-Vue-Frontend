import { createStore } from 'vuex';
import { auth } from "./auth.module";

const store = createStore({
  modules: {
    auth,
  },
  state: {
    logged: false,
    user: 'Michał',
    admin: false,
    access_token: '',
    refresh_token: ''
  },
  getters: {
    getLoggedStatus: state => state.logged,
    getAdminPrivileges: state => state.admin,
    getUser: state => state.user,
    getAccessToken: state => state.access_token,
    getRefreshToken: state => state.refresh_token
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
    },
    setAccessToken(state, payload) {
      state.access_token = payload;
    },
    setRefreshToken(state, payload) {
      state.refresh_token = payload;
    }
  },
  actions: {
  },
})

export default store;
