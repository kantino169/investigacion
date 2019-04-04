import Vue from 'vue'
import Vuex from 'vuex'
import { setToken } from './interface'

import facultad from './facultad'
import usuario from './usuario'
import fechaEntrega from './fechaEntrega'
import evaluador from './evaluador'
import proyecto from './proyecto'
import disciplina from './disciplina'
import listaUsuario from './listaUsuario'
import presupuesto from './presupuesto'
import actividades from './actividades'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    facultad,
    usuario,
    fechaEntrega,
    evaluador,
    proyecto,
    disciplina,
    listaUsuario,
    presupuesto,
    actividades
  }
})

store.subscribe(mutation => {
  if (mutation.type === 'usuario/guardar') {
    if (mutation.payload) {
      setToken(mutation.payload.token)
      localStorage.setItem('inv-session', JSON.stringify(mutation.payload))
    } else {
      localStorage.clear('inv-session')
      setToken()
    }
  }
})

const localData = localStorage.getItem('inv-session')
if (localData) {
  store.commit('usuario/guardar', JSON.parse(localData))
}

export default store
