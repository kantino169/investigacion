import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, horas) {
  for (const hora of horas) {
    Vue.set(state, hora.id, hora)
  }
}

export function actualizar (state, {id, fecha, lugarActividad, horario, hrs}) {
  state[id].fecha = fecha
  state[id].lugarActividad = lugarActividad
  state[id].horario = horario
  state[id].hrs = hrs
}
