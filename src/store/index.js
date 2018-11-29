import Vue from 'vue'
import Vuex from 'vuex'
import { setToken } from './interface'

import facultad from './facultad'
import usuario from './usuario'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    facultad,
    usuario
  }
})

store.subscribe(mutation => {
  if (mutation.type === 'usuario/guardar') {
    if (mutation.payload) {
      setToken(mutation.payload.token)
    } else {
      setToken()
    }
  }
})

export default store
