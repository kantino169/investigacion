import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: actividades} = await axios.get('actividades')
  commit('agregar', actividades)
}

export async function crear ({commit}, {rubro, monto}) {
  const {data: actividad} = await axios.post('actividades', {rubro, monto})
  commit('agregar', [actividad])
}

export async function modificar ({commit}, {rubro, monto, id}) {
  await axios.put(`actividades/${id}`, {rubro, monto})
  commit('actualizar', {rubro, monto, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`actividades/${id}`)
  commit('eliminar', {id})
}
