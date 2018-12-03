import Vue from 'vue'

export function agregar (state, fechasEntrega) {
  for (const id in fechasEntrega) {
    Vue.set(state, id, fechasEntrega[id])
  }
}
