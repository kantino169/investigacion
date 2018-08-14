import Vue from 'vue'

export function removeAll (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function add (state, facultades) {
  for (const id in facultades) {
    Vue.set(state, id, facultades[id])
  }
}
