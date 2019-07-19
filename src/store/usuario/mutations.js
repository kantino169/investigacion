/*
export function someMutation (state) {
}
*/

export function guardar (state, {id, username, token, tipoUsuario} = {}) {
  state.id = id
  state.username = username
  state.token = token
  state.tipoUsuario = tipoUsuario
}
