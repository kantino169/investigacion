import Vue from 'vue'

export function cargarModalidades (state, modalidades) {
  for (const id in modalidades) {
    Vue.set(state, id, modalidades[id])
  }
}
