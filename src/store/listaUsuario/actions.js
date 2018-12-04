/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function cargarTodos ({commit}) {
  const {data: usuarios} = await axios.get('usuarios')
  commit('agregar', usuarios)
}

export async function crear ({commit}, {name, email, password}) {
  const {data: usuario} = await axios.post('usuarios', {name, email, password})
  commit('agregar', {[usuario.id]: usuario})
}

export async function modificar ({commit}, {nombre, id, email}) {
  await axios.put(`usuarios/`, {id, nombre, email})
  commit('actualizar', {nombre, id, email})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`usuarios/${id}`)
  commit('eliminar', {id})
}

export async function modificarContraseña ({commit}, {email, oldPassword, newPassword}) {
  await axios.put(`usuarios/password`, {email, oldPassword, newPassword})
  // commit('actualizar', {email})
}
