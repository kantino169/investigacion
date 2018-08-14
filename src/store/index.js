import Vue from 'vue'
import Vuex from 'vuex'
import { setToken } from './interface'

import facultad from './facultad'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    facultad
  }
})

store.subscribe(mutation => {
  if (mutation.type === 'user/set') {
    setToken(mutation.payload.token)
  } else if (mutation.type === 'user/unset') {
    setToken()
  }
})

export default store
