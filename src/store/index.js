import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './fake-api'
import * as api2 from './api'

Vue.use(Vuex)

const state = {
  user: undefined,
  userList: [],
  projects: {},
  projectsInformation: undefined,
  investigationLines: [{ id: '0', name: 'linea 1', id_grupo: '1' }, {id: '1', name: 'linea 2', id_grupo: '2'}],
  groups: [{id: '0', name: 'grupo 1'}]
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
  },

  'add-or-update-project' (state, {id, project}) {
    if (id === undefined) return
    if (state.projects[id]) {
      state.projects[id] = project
    }
    else {
      Vue.set(state.projects, id, project)
    }
  },

  'set-projects-information' (state, payload) {
    Vue.set(state, 'projectsInformation', Object.assign({}, state.projectsInformation || {}, payload))
  },

  'remove-investigation-line' (state, line) {
    const index = state.investigationLines.indexOf(line)
    if (index > -1) {
      state.investigationLines.splice(index, 1)
    }
  },

  'set-groups-list' (state, groups) {
    state.groups = groups
  },

  'remove-group' (state, group) {
    const index = state.groups.indexOf(group)
    if (index > -1) {
      state.groups.splice(index, 1)
    }
  }
}

const actions = {

  async 'crear-cuenta' (store, datos) {
    await api2.signup(datos)
    await store.dispatch('iniciar-sesion', datos)
  },

  async 'iniciar-sesion' (store, datos) {
    if (datos.token) {
      store.commit('set-user', datos)
    }
    else {
      const user = await api2.login(datos)
      store.commit('set-user', user)
    }
  },

  'cerrar-sesion' (store) {
    store.commit('set-user')
  },

  async 'cambiar-password' (store, {oldPassword, newPassword}) {
    await api.changePassword({oldPassword, newPassword, email: store.state.user.email})
  },

  async 'cargar-usuarios' (store) {
    if (store.state.userList.length === 0) {
      const list = await api2.userList()
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
  },

  async 'load-project' (store, id) {
    store.commit('add-or-update-project', {id, project: await api.getProyecto(id)})
  },

  async 'load-projects' (store) {
    const projects = await api.getProyectos()
    for (const project of projects) {
      store.commit('add-or-update-project', {id: project.id, project})
    }
  },

  async 'delete-project' (store, id) {
    await api.deleteProyecto(id)
    store.commit('add-or-update-project', {id})
  },

  async 'load-project-config' (store) {
    const [modes, investigationLines, groups, academicUnits, studyDisciplines] = await Promise.all([
      api.getModalidades(),
      api.getLineasDeInvestigacion(),
      api.getGrupoLineaDeInvestigacion(),
      api.getUnidadesAcademicas(),
      api.getDisciplinasDeEstudio()
    ])
    store.commit('set-projects-information', {modes, investigationLines, groups, academicUnits, studyDisciplines})
  },

  async 'update-investigation-line' (store, line) {

  },

  async 'remove-investigation-line' (store, line) {
    store.commit('remove-investigation-line', line)
  },

  async 'get-groups' (store) {
    const groups = await api2.getGroups()
    store.commit('set-groups-list', groups)
  },

  async 'remove-group' (store, group) {
    store.commit('remove-group', group)
  },

  async 'get-users' (store) {
    const users = await api2.userList()
    store.commit('set-user-list', users)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

{
  const user = localStorage.getItem('inv-user')
  if (user) {
    store.dispatch('iniciar-sesion', JSON.parse(user))
  }
}

store.subscribe(({type, payload}, state) => {
  if (type !== 'set-user') return
  if (payload) {
    api.setToken(payload.token)
    localStorage.setItem('inv-user', JSON.stringify(payload))
  }
  else {
    localStorage.removeItem('inv-user')
    api.setToken()
  }
})

export default store
