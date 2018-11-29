import { getSubtree } from './utils'

const armarLista = state => id => ({id, nombre: state[id].nombre})

export const facultades = state =>
  Object.keys(state).map(armarLista(state))

export const carreras = state => idFacultad => {
  const carreras = getSubtree(state, idFacultad).carreras
  return Object.keys(carreras).map(armarLista(carreras))
}

export const grupos = state => idCarrera => {
  const grupos = getSubtree(state, idCarrera, 'carrera').grupos
  return Object.keys(grupos).map(armarLista(grupos))
}

export const subgrupos = state => idGrupo => {
  const subgrupos = getSubtree(state, idGrupo, 'carrera', 'grupo').subgrupos
  return Object.keys(subgrupos).map(armarLista(subgrupos))
}

export const lineas = state => idSubgrupo => {
  const lineas = getSubtree(state, idSubgrupo, 'carrera', 'grupo', 'subgrupo').lineas
  return Object.keys(lineas).map(armarLista(lineas))
}
