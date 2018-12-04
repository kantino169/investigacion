const armarLista = state => id => ({id, nombre: state[id].nombre})

export const disciplinas = state =>
  Object.keys(state).map(armarLista(state))
