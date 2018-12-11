import Vue from 'vue'

export function cargarModalidades (state, modalidades) {
  for (const modalidad of modalidades) {
    Vue.set(state, modalidad.id, modalidad)
  }
}

export function cargarUnidadesAcademicas (state, unidadesAcademicas) {
  for (const id in unidadesAcademicas) {
    Vue.set(state, id, unidadesAcademicas[id])
  }
}

export function agregar (state, proyectos) {
  for (const proyecto of proyectos) {
    Vue.set(state, proyecto.id, proyecto)
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}
