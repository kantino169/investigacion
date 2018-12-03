import axios from 'axios'

export async function cargarTodos ({commit}) {
  const {data: evaluadores} = await axios.get('evaluadores')
  commit('agregar', evaluadores)
}
