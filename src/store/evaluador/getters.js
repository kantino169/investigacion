const armarLista = state => id => ({id, nombre: state[id].nombre, apellido: state[id].apellido, email: state[id].email})

export const evaluadores = state =>
  Object.keys(state).map(armarLista(state))
