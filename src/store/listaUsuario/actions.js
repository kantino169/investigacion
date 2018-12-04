/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function cargarTodos ({commit}) {
  const {data: usuarios} = await axios.get('usuarios')
  commit('agregar', usuarios)
}
