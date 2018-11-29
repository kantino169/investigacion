import axios from 'axios'

export async function iniciarSesion ({commit}, {email, password}) {
  const { data: usuario } = await axios.post('usuarios/session', {email, password})
  commit('guardar', usuario)
}

export function cerrarSesion ({commit}) {
  commit('guardar', undefined)
}
