import Vue from 'vue'

export function agregar (state, fechasEntrega) {
  for (const fechaEntrega of fechasEntrega) {
    Vue.set(state, fechaEntrega.id, fechaEntrega)
  }
}
