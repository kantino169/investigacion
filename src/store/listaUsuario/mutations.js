/*
export function someMutation (state) {
}
*/
import Vue from 'vue'

export function agregar (state, usuarios) {
  for (const usuario of usuarios) {
    Vue.set(state, usuario.id, usuario)
  }
}

export function actualizar (state, usuario) {
  state[usuario.id] = usuario
}

export function eliminarTodos (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}
