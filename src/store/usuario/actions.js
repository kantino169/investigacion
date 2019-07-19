import axios from 'axios'

export async function iniciarSesion ({commit}, {username, password}) {
  const { data: usuario } = await axios.post('usuarios/login', {username, password})
  commit('guardar', usuario)
}

export function cerrarSesion ({commit}) {
  commit('guardar', undefined)
}
