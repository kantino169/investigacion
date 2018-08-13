import Vue from 'vue'

export const add = (state, groups) => {
  for (const id in groups) {
    Vue.set(state, id, groups[id])
  }
}

export const removeAll = (state) => {
  for (const id in state) {
    Vue.delete(state, id)
  }
}
