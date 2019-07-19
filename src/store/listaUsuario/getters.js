/*
export function someGetter (state) {
}
*/
const armarLista = state => id => ({id,
  nombre: state[id].nombre,
  username: state[id].username,
  tipoUsuario: state[id].tipoUsuario})

export const usuarios = state =>
  Object.keys(state).map(armarLista(state))
