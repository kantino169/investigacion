import Vue from 'vue'

export const removeAll = (state) => {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export const addOrUpdate = (state, facultades) => {
  for (const id in facultades) {
    Vue.set(state, id, facultades[id])
  }
}
