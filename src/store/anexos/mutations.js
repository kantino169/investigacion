import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, anexos) {
  for (const anexo of anexos) {
    Vue.set(state, anexo.id, anexo)
  }
}

export function actualizar (state, {id, nombreArchivo}) {
  state[id].nombreArchivo = nombreArchivo
}
