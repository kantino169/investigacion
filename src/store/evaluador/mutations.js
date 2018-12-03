import Vue from 'vue'

export function agregar (state, evaluadores) {
  for (const id in evaluadores) {
    Vue.set(state, id, evaluadores[id])
  }
}
