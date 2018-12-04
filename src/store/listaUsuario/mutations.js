/*
export function someMutation (state) {
}
*/
import Vue from 'vue'

export function agregar (state, usuarios) {
  for (const id in usuarios) {
    Vue.set(state, id, usuarios[id])
  }
}
