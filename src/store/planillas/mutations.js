import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, planillas) {
  for (const planilla of planillas) {
    Vue.set(state, planilla.id, planilla)
  }
}

export function actualizar (state, {id, mes, cantidadHoras, codigo}) {
  state[id].mes = mes
  state[id].cantidadHoras = cantidadHoras
  state[id].codigo = codigo
}
