const armarLista = state => id => ({id, nombre: state[id].nombre})
const armarLista2 = state => id => ({id, titulo: state[id].titulo, idModalidad: state[id].idModalidad, director_id: state[id].director_id})

export const modalidades = state =>
  Object.keys(state).map(armarLista(state))

export const unidadesAcademicas = state =>
  Object.keys(state).map(armarLista(state))

export const proyectos = state =>
  Object.keys(state).map(armarLista2(state))
