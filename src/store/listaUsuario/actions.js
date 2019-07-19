/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function cargarTodos ({ commit }) {
  const { data: usuarios } = await axios.get('usuarios')
  commit('agregar', usuarios)
}

export async function darPrivilegios ({commit}, {id, tipoUsuario}) {
  const { data: usuario } = await axios.put('usuarios/privilegios', {id, tipoUsuario})
  commit('actualizar', usuario)
}

export async function insertarUsuarios ({commit}) {
  await axios.post('usuarios/insertar/alumnos')
  await axios.post('usuarios/insertar/empleados')
  const { data: usuarios } = await axios.get('usuarios')
  commit('agregar', usuarios)
}

export async function crear ({ commit }, { username, tipoUsuario }) {
  const { data: usuario } = await axios.post('usuarios', {
    username,
    tipoUsuario
  })
  commit('agregar', [usuario])
}

export async function eliminar ({ commit }, { id }) {
  await axios.delete(`usuarios/${id}`)
  commit('eliminar', { id })
}

export async function modificarContraseña (
  { commit },
  { email, oldPassword, newPassword }
) {
  await axios.put(`usuarios/password`, { email, oldPassword, newPassword })
  // commit('actualizar', {email})
}
