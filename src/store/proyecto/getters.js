const armarLista = state => id => ({id, nombre: state[id].nombre})

export const modalidades = state =>
  Object.keys(state).map(armarLista(state))

export const unidadesAcademicas = state =>
  Object.keys(state).map(armarLista(state))
