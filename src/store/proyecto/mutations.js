import Vue from 'vue'

export function cargarModalidades (state, modalidades) {
  for (const modalidad of modalidades) {
    Vue.set(state, modalidad.id, modalidad)
  }
}

export function cargarUnidadesAcademicas (state, unidadesAcademicas) {
  for (const unidadAcademica of unidadesAcademicas) {
    Vue.set(state, unidadAcademica.id, unidadAcademica)
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
