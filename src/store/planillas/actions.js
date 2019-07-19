import axios from 'axios'

export async function cargarTodas ({commit}, idProyecto) {
  const {data: planillas} = await axios.get(`planillas/${idProyecto}`)
  commit('agregar', planillas)
}

export async function crear ({commit}, {idProyecto, idBecario, mes, cantidadHoras, codigo}) {
  const {data: planillas} = await axios.post('planillas', {idProyecto, idBecario, mes, cantidadHoras, codigo})
  commit('agregar', [planillas])
}

export async function modificar ({commit}, {mes, cantidadHoras, codigo, id}) {
  await axios.put(`planillas/${id}`, {mes, cantidadHoras, codigo})
  commit('actualizar', {mes, cantidadHoras, codigo, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`planillas/${id}`)
  commit('eliminar', {id})
}
