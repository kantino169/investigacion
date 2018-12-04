/*
export function someMutation (state) {
}
*/

export function guardar (state, {id, email, token} = {}) {
  state.id = id
  state.email = email
  state.token = token
}
