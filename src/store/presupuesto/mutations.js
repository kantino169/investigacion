import Vue from 'vue'

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function agregar (state, presupuestos) {
  for (const presupuesto of presupuestos) {
    Vue.set(state, presupuesto.id, presupuesto)
  }
}

export function actualizar (state, {id, rubro, monto}) {
  state[id].rubro = rubro
  state[id].monto = monto
}
