import Vue from 'vue'
import { getSubtree } from './utils'

const path = ['carrera', 'grupo', 'subgrupo', 'linea']

export function eliminarTodas (state) {
  for (const id in state) {
    Vue.delete(state, id)
  }
}

export function agregar (state, facultades) {
  for (const id in facultades) {
    Vue.set(state, id, facultades[id])
  }
}

export function agregarCarrera (state, carrera) {
  const carreras = state[carrera.id_facultad].carreras
  Vue.set(carreras, carrera.id, carrera)
}

export function agregarGrupo (state, grupo) {
  let carrera = getSubtree(state, grupo.id_carrera, 'carrera')
  if (!carrera) return
  Vue.set(carrera.grupos, grupo.id, grupo)
}

export function agregarSubgrupo (state, subgrupo) {
  let grupo = getSubtree(state, subgrupo.id_grupo, 'carrera', 'grupo')
  if (!grupo) return
  Vue.set(grupo.subgrupos, subgrupo.id, subgrupo)
}

export function agregarLinea (state, linea) {
  let subgrupo = getSubtree(state, linea.id_subgrupo, 'carrera', 'grupo', 'subgrupo')
  if (!subgrupo) return
  Vue.set(subgrupo.lineas, linea.id, linea)
}

export function actualizar (state, {id, nombre, altura}) {
  if (altura < 0 || altura > 4) throw Error('Profundidad incorrecta')
  const subtree = getSubtree(state, id, ...path.slice(0, altura))
  subtree.nombre = nombre
}

export function eliminar (state, {id, altura}) {
  let parent
  if (altura === 0) {
    parent = state
  } else {
    const subtree = getSubtree(state, id, ...path.slice(0, altura - 1))
    parent = subtree[`${path[altura - 1]}s`]
  }
  Vue.delete(parent, id)
}
