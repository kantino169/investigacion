import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const state = {
  user: undefined,
  userList: []
}

const mutations = {
  'set-user' (state, user) {
    state.user = user
  },

  'set-user-list' (state, list) {
    if (Array.isArray(list)) {
      state.userList = list
      return
    }
    if (list.$add) state.userList.push(list.$add)
    if (list.$remove) {
      const index = state.userList.indexOf(list.$remove)
      if (index > -1) state.userList.splice(index, 1)
    }
  }
}

const actions = {

  async 'iniciar-sesion' (store, datos) {
    if (datos.token) {
      api.setToken(datos.token)
      store.commit('set-user', datos)
    }
    else {
      const user = await api.login(datos)
      localStorage.setItem('inv-user', JSON.stringify(user))
      store.commit('set-user', user)
      api.setToken(user.token)
    }
  },

  'cerrar-sesion' (store) {
    api.logout()
      .then(() => store.commit('set-user'))
      .then(() => localStorage.removeItem('teo-user'))
  },

  async 'cambiar-password' (store, {oldPassword, newPassword}) {
    await api.changePassword({oldPassword, newPassword, email: store.state.user.email})
  },

  async 'cargar-usuarios' (store) {
    if (store.state.userList.length === 0) {
      const list = await api.userList()
      store.commit('set-user-list', list)
    }
  },

  async 'crear-usuario' (store, {email, password}) {
    const user = await api.createUser({email, password})
    store.commit('set-user-list', {$add: user})
  },

  async 'eliminar-usuario' (store, user) {
    await api.removeUser(user._id)
    store.commit('set-user-list', {$remove: user})
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
