import Vue from 'vue'

export function agregar (state, informes) {
  for (const informe of informes) {
    Vue.set(state, informe.id, informe)
  }
}

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function actualizar (state, {id, etapa, estado, articulos, actividades}) {
  state[id].etapa = etapa
  state[id].estado = estado
  state[id].articulos = articulos
  state[id].actividades = actividades
}
