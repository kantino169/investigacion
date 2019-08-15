import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, becarios) {
  for (const becario of becarios) {
    Vue.set(state, becario.id, becario)
  }
}

export function actualizar (state, {id, idRolInvestigador, horasSemanales, cantidadMeses, idCategoria, aprobacionBecario}) {
  state[id].idRolInvestigador = idRolInvestigador
  state[id].horasSemanales = horasSemanales
  state[id].cantidadMeses = cantidadMeses
  state[id].idCategoria = idCategoria
  state[id].aprobacionBecario = aprobacionBecario
}
