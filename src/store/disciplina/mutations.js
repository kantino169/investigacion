import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, disciplinas) {
  for (const id in disciplinas) {
    Vue.set(state, id, disciplinas[id])
  }
}

export function actualizar (state, {id, nombre}) {
  state[id].nombre = nombre
}
