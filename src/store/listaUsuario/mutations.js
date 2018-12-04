/*
export function someMutation (state) {
}
*/
import Vue from 'vue'

export function agregar (state, usuarios) {
  for (const id in usuarios) {
    Vue.set(state, id, usuarios[id])
  }
}

export function actualizar (state, {id, email, name}) {
  state[id].name = name
  state[id].id = id
  state[id].email = email
}

export function eliminarTodos (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}
