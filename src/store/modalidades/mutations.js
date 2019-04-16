import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, modalidades) {
  for (const modalidad of modalidades) {
    Vue.set(state, modalidad.id, modalidad)
  }
}

export function actualizar (state, {id, nombre}) {
  state[id].nombre = nombre
}
