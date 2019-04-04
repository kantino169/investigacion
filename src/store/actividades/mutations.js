import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, actividades) {
  for (const actividad of actividades) {
    Vue.set(state, actividad.id, actividad)
  }
}

export function actualizar (state, {id, actividad, primers, segundos}) {
  state[id].actividad = actividad
  state[id].primers = primers
  state[id].segundos = segundos
}
