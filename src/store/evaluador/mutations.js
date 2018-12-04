import Vue from 'vue'

export function agregar (state, evaluadores) {
  for (const id in evaluadores) {
    Vue.set(state, id, evaluadores[id])
  }
}

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function actualizar (state, evaluador) {
  state[evaluador.id] = evaluador
}
