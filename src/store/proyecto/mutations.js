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

export function modificarEstado (state, {id, estado, aprobacion}) {
  switch (aprobacion) {
    case 1 :
      state[id].aprobado1 = estado
      break
    case 2 :
      state[id].aprobado2 = estado
      break
    case 3 :
      state[id].aprobado3 = estado
      break
    case 4 :
      state[id].aprobado4 = estado
      break
    case 5 :
      state[id].aprobado5 = estado
      break
  }
}

export function eliminar (state, {id}) {
  Vue.delete(state, id)
}

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}
