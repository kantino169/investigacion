import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function agregar (state, facultades) {
  for (const id in facultades) {
    Vue.set(state, id, facultades[id])
  }
}
