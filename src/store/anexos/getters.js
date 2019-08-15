const armarLista = state => id => ({id, nombreArchivo: state[id].nombreArchivo, idUsuario: state[id].idUsuario})

export const anexos = state =>
  Object.keys(state).map(armarLista(state))
