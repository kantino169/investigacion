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
    await api2.changePassword({oldPassword, newPassword, email: store.state.user.email})
  },

  async 'cargar-usuarios' (store) {
    if (store.state.userList.length === 0) {
      const list = await api2.userList()
      store.commit('set-user-list', list)
    }
  },

  async 'eliminar-usuario' (store, user) {
    await api2.removeUser(user.id)
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
      api2.getModalidades(),
      api2.getLineasDeInvestigacion(),
      api2.getGroups(),
      api2.getUnidadesAcademicas(),
      api2.getDisciplinasDeEstudio()
    ])
    store.commit('set-projects-information', {modes, investigationLines, groups, academicUnits, studyDisciplines})
  },

  async 'create-investigation-line' (store, data) {
    const line = await api2.createInvestigationLine(data)
    store.commit('save-investigationLine', line)
  },

  async 'create-studyDiscipline' (store, data) {
    const discipline = await api2.createDiscipline(data)
    store.commit('save-studyDiscipline', discipline)
  },

  async 'create-group' (store, data) {
    const group = await api2.createGroup(data)
    store.commit('save-group', group)
  },

  async 'update-investigation-line' (store, data) {
    const line = await api2.updateInvestigationLine(data)
    store.commit('save-investigationLine', line)
  },

  async 'update-studyDiscipline' (store, data) {
    const discipline = await api2.updateDiscipline(data)
    store.commit('save-studyDiscipline', discipline)
  },

  async 'update-group' (store, data) {
    const group = await api2.updateGroup(data)
    store.commit('save-group', group)
  },

  async 'remove-investigation-line' (store, line) {
    const response = await api2.deleteLine(line.id)
    if (response.success) {
      store.commit('remove-investigation-line', line)
    }
    else {
      throw Error('La linea seleccionada no puede eliminarse porque pertenece a un grupo')
    }
  },

  async 'remove-studyDiscipline' (store, discipline) {
    const response = await api2.deleteDiscipline(discipline.id)
    if (response.success) {
      store.commit('remove-studyDiscipline', discipline)
    }
    else {
      throw Error('La disciplina seleccionada no ha podido ser eliminada. Posiblemente este siendo usada en un proyecto.')
    }
  },

  async 'remove-project' (store, project) {
    const response = await api2.deleteProject(project.id)
    if (response.success) {
      store.commit('remove-project', project)
    }
  },

  async 'get-projects' (store) {
    const projects = await api2.getProyectos()
    store.commit('set-projects-list', projects)
  },

  async 'get-groups' (store) {
    const groups = await api2.getGroups()
    store.commit('set-groups-list', groups)
  },

  async 'remove-group' (store, group) {
    const response = await api2.deleteGroup(group.id)
    if (response.success) {
      store.commit('remove-group', group)
    }
    else {
      throw Error('El grupo no ha podido ser eliminado. Posiblemente tenga lineas de investigacion asignadas.')
    }
  },

  async 'get-users' (store) {
    const users = await api2.userList()
    store.commit('set-user-list', users)
  },

  async 'get-lines' (store) {
    const investigationLines = await api2.getLineasDeInvestigacion()
    store.commit('set-investigationLines-list', investigationLines)
  },

  async 'get-disciplines' (store) {
    const studyDisciplines = await api2.getDisciplinasDeEstudio()
    store.commit('set-studyDisciplines-list', studyDisciplines)
  },

  async 'give-access' (store, data) {
    const user = await api2.giveAccess(data)
    store.commit('give-access', user)
  },

  async 'update-user' (store, data) {
    const user = await api2.updateUser(data)
    store.commit('update-user', user)
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
