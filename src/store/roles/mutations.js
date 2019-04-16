import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, roles) {
  for (const rol of roles) {
    Vue.set(state, rol.id, rol)
  }
}

export function actualizar (state, {id, rol}) {
  state[id].rol = rol
}
