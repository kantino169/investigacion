/*
export function someGetter (state) {
}
*/
const armarLista = state => id => ({id,
  nombre: state[id].nombre,
  email: state[id].email,
  tipoUsuario: state[id].tipo_usuario})

export const usuarios = state =>
  Object.keys(state).map(armarLista(state))
