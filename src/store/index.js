import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

import group from './group'

Vue.use(Vuex)

const state = {
  user: undefined,
  userList: [],
  projects: [],
  projectsInformation: undefined,
  investigationLines: [],
  groups: [],
  studyDisciplines: []

}
// ################################################################################
// ################################################################################
// ################################################################################
// ################################################################################
// ###################   MUTATIONS    #############################################
// ################################################################################
// ################################################################################
// ################################################################################
// ################################################################################
const mutations = {
  // #
  // #
  // ################################################################################
  // ################################################################################
  // problema: si el admin crea un usuario para otra persona, se le loguea automaticamente con ese user.
  // ################################################################################
  // ################################################################################
  // #####################
  // #####################
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

  /* 'add-or-update-project' (state, {id, project}) {
    if (id === undefined) return
    if (state.projects[id]) {
      state.projects[id] = project
    }
    else {
      Vue.set(state.projects, id, project)
    }
  }, */

  'set-projects-information' (state, payload) {
    Vue.set(state, 'projectsInformation', Object.assign({}, state.projectsInformation || {}, payload))
  },

  'save-investigationLine' (state, line) {
    const index = state.investigationLines.findIndex(l => l.id === line.id)
    if (index > -1) {
      state.investigationLines.splice(index, 1, line)
    }
    else {
      state.investigationLines.push(line)
    }
  },

  'save-studyDiscipline' (state, discipline) {
    const index = state.studyDisciplines.findIndex(d => d.id === discipline.id)
    if (index > -1) {
      state.studyDisciplines.splice(index, 1, discipline)
    }
    else {
      state.studyDisciplines.push(discipline)
    }
  },

  'save-group' (state, group) {
    const index = state.groups.findIndex(g => g.id === group.id)
    if (index > -1) {
      state.groups.splice(index, 1, group)
    }
    else {
      state.groups.push(group)
    }
  },

  'save-project' (state, project) {
    const index = state.projects.findIndex(i => i.id === project.id)
    if (index > -1) {
      state.projects.splice(index, 1, project)
    }
    else {
      state.projects.push(project)
    }
  },

  'remove-investigation-line' (state, line) {
    const index = state.investigationLines.indexOf(line)
    if (index > -1) {
      state.investigationLines.splice(index, 1)
    }
  },

  'remove-studyDiscipline' (state, discipline) {
    const index = state.studyDisciplines.indexOf(discipline)
    if (index > -1) {
      state.studyDisciplines.splice(index, 1)
    }
  },

  'remove-project' (state, project) {
    const index = state.projects.indexOf(project)
    if (index >= -1) {
      state.projects.splice(index, 1)
    }
  },

  'set-projects-list' (state, projects) {
    state.projects = projects
  },

  'set-groups-list' (state, groups) {
    state.groups = groups
  },

  'set-investigationLines-list' (state, investigationLines) {
    state.investigationLines = investigationLines
  },

  'set-studyDisciplines-list' (state, studyDisciplines) {
    state.studyDisciplines = studyDisciplines
  },

  'remove-group' (state, group) {
    const index = state.groups.indexOf(group)
    if (index > -1) {
      state.groups.splice(index, 1)
    }
  },
  'give-access' (state, user) {
    const index = state.userList.findIndex(u => u.id === user.id)
    if (index > -1) {
      state.userList.splice(index, 1, user)
    }
  },

  'update-user' (state, user) {
    const index = state.userList.findIndex(u => u.id === user.id)
    if (index > -1) {
      state.userList.splice(index, 1, user)
    }
  }
}
// ################################################################################
// ################################################################################
// ################################################################################
// ################################################################################
// ###############   ACTIONS    ###################################################
// ################################################################################
// ################################################################################
// ################################################################################
// ################################################################################
const actions = {
  // USERS
  async 'crear-cuenta' (store, datos) {
    await api.signup(datos)
    await store.dispatch('iniciar-sesion', datos)
    // store.commit('set-user-list', datos)
  },

  async 'iniciar-sesion' (store, datos) {
    if (datos.token) {
      store.commit('set-user', datos)
    }
    else {
      const user = await api.login(datos)
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
    // if (store.state.userList.length === 0)
    const list = await api.userList()
    store.commit('set-user-list', list)
  },

  async 'eliminar-usuario' (store, user) {
    await api.removeUser(user.id)
    store.commit('set-user-list', {$remove: user})
  },
  /* async 'crear-usuario' (store, {email, password}) {
    const user = await api.createUser({email, password})
    store.commit('set-user-list', {$add: user})
  }, */

  /* async 'load-project' (store, id) {
    store.commit('add-or-update-project', {id, project: await api.getProyecto(id)})
  },
  async 'load-projects' (store) {
    const projects = await api.getProyectos()
    for (const project of projects) {
      store.commit('add-or-update-project', {id: project.id, project})
    }
  }, */
  /* async 'delete-project' (store, id) {
    await api.deleteProyecto(id)
    store.commit('add-or-update-project', {id})
  }, */

  async 'load-project-config' (store) {
    const [modes, investigationLines, groups, academicUnits, studyDisciplines] = await Promise.all([
      api.getModalidades(),
      api.getLineasDeInvestigacion(),
      api.getGroups(),
      api.getUnidadesAcademicas(),
      api.getDisciplinasDeEstudio()
    ])
    store.commit('set-projects-information', {modes, investigationLines, groups, academicUnits, studyDisciplines})
  },

  async 'create-investigation-line' (store, data) {
    const line = await api.createInvestigationLine(data)
    store.commit('save-investigationLine', line)
  },

  async 'create-studyDiscipline' (store, data) {
    const discipline = await api.createDiscipline(data)
    store.commit('save-studyDiscipline', discipline)
  },

  async 'create-group' (store, data) {
    const group = await api.createGroup(data)
    store.commit('save-group', group)
  },

  async 'create-project' (store, data) {
    const project = await api.createProject(data)
    store.commit('save-project', project)
  },

  async 'update-project' ({commit}, data) {
    const project = await api.updateProject(data)
    commit('save-project', project)
  },

  async 'update-investigation-line' ({commit}, data) {
    const line = await api.updateInvestigationLine(data)
    commit('save-investigationLine', line)
  },

  async 'update-studyDiscipline' (store, data) {
    const discipline = await api.updateDiscipline(data)
    store.commit('save-studyDiscipline', discipline)
  },

  async 'update-group' (store, data) {
    const group = await api.updateGroup(data)
    store.commit('save-group', group)
  },

  async 'remove-investigation-line' (store, line) {
    const response = await api.deleteLine(line.id)
    if (response.success) {
      store.commit('remove-investigation-line', line)
    }
    else {
      throw Error('La linea seleccionada no puede eliminarse porque pertenece a un grupo')
    }
  },

  async 'remove-studyDiscipline' (store, discipline) {
    const response = await api.deleteDiscipline(discipline.id)
    if (response.success) {
      store.commit('remove-studyDiscipline', discipline)
    }
    else {
      throw Error('La disciplina seleccionada no ha podido ser eliminada. Posiblemente este siendo usada en un proyecto.')
    }
  },

  async 'remove-project' (store, project) {
    const response = await api.deleteProject(project.id)
    if (response.success) {
      store.commit('remove-project', project)
    }
  },

  async 'get-projects' (store) {
    const projects = await api.getProyectos()
    store.commit('set-projects-list', projects)
  },

  async 'get-project' (store, id) {
    const project = await api.getProyecto(id)
    store.commit('save-project', project)
  },

  async 'get-groups' (store) {
    const groups = await api.getGroups()
    store.commit('set-groups-list', groups)
  },

  async 'remove-group' (store, group) {
    const response = await api.deleteGroup(group.id)
    if (response.success) {
      store.commit('remove-group', group)
    }
    else {
      throw Error('El grupo no ha podido ser eliminado. Posiblemente tenga lineas de investigacion asignadas.')
    }
  },

  // async 'get-users' (store) {
  //   const users = await api.userList()
  //   store.commit('set-user-list', users)
  // },
  async 'get-lines' (store) {
    const investigationLines = await api.getLineasDeInvestigacion()
    store.commit('set-investigationLines-list', investigationLines)
  },

  async 'get-disciplines' (store) {
    const studyDisciplines = await api.getDisciplinasDeEstudio()
    store.commit('set-studyDisciplines-list', studyDisciplines)
  },

  async 'give-access' (store, data) {
    const user = await api.giveAccess(data)
    store.commit('give-access', user)
  },

  async 'update-user' (store, data) {
    const user = await api.updateUser(data)
    store.commit('update-user', user)
  }

}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    group
  }
})

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

{
  const user = localStorage.getItem('inv-user')
  if (user) {
    store.dispatch('iniciar-sesion', JSON.parse(user))
  }
}

export default store
