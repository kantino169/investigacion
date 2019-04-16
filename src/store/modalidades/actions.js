import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: modalidades} = await axios.get('modalidades')
  commit('agregar', modalidades)
}

export async function crear ({commit}, {nombre}) {
  const {data: modalidad} = await axios.post('modalidades', {nombre})
  commit('agregar', [modalidad])
}

export async function modificar ({commit}, {nombre, id}) {
  await axios.put(`modalidades/${id}`, {nombre})
  commit('actualizar', {nombre, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`modalidades/${id}`)
  commit('eliminar', {id})
}
