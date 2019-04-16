const armarLista = state => id => ({id, rol: state[id].rol})

export const roles = state =>
  Object.keys(state).map(armarLista(state))
