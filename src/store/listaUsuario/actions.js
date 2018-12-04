/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function cargarTodos ({commit}) {
  const {data: usuarios} = await axios.get('usuarios')
  commit('agregar', usuarios)
}

export async function crearUsuario ({commit}, {nombre, email, password}) {
  const {data: usuario} = await axios.post('usuarios', {nombre, email, password})
  commit('agregar', {[usuario.id]: usuario})
}

export async function modificarUsuario ({commit}, {nombre, id, email}) {
  await axios.put(`usuarios/`, {id, nombre, email})
  commit('actualizar', {nombre, id, email})
}

export async function eliminarUsuario ({commit}, {id}) {
  await axios.delete(`usuarios/${id}`)
  commit('eliminar', {id})
}

export async function modificarContraseña ({commit}, {email, oldPassword, newPassword}) {
  await axios.put(`usuarios/password`, {email, oldPassword, newPassword})
  // commit('actualizar', {nombre, id, email})
}
