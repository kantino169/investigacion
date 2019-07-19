import axios from 'axios'

export async function cargarTodas ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: anexos} = await axios.get(`anexos/${idProyecto}`)
  commit('agregar', anexos)
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`anexos/${id}`)
  commit('eliminar', {id})
}
