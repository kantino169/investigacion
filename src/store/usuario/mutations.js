/*
export function someMutation (state) {
}
*/

export function guardar (state, {id, email, token, tipoUsuario} = {}) {
  state.id = id
  state.email = email
  state.token = token
  state.tipoUsuario = tipoUsuario
}
