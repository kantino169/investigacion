import Vue from 'vue'

export function cargarModalidades (state, modalidades) {
  for (const id in modalidades) {
    Vue.set(state, id, modalidades[id])
  }
}

export function cargarUnidadesAcademicas (state, unidadesAcademicas) {
  for (const id in unidadesAcademicas) {
    Vue.set(state, id, unidadesAcademicas[id])
  }
}

export function agregar (state, proyectos) {
  for (const id in proyectos) {
    Vue.set(state, id, proyectos[id])
  }
}
