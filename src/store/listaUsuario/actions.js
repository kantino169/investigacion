/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function cargarTodos({ commit }) {
  const { data: usuarios } = await axios.get('usuarios')
  commit('agregar', usuarios)
}

export async function crear({ commit }, { name, email, password }) {
  const { data: usuario } = await axios.post('usuarios', {
    name,
    email,
    password
  })
  commit('agregar', [usuario])
}

export async function modificar({ commit }, { name, id, email }) {
  const { data: usuario } = await axios.put('usuarios', { id, name, email })
  commit('actualizar', usuario)
}

export async function eliminar({ commit }, { id }) {
  await axios.delete(`usuarios/${id}`)
  commit('eliminar', { id })
}

export async function modificarContraseña(
  { commit },
  { email, oldPassword, newPassword }
) {
  await axios.put(`usuarios/password`, { email, oldPassword, newPassword })
  // commit('actualizar', {email})
}
