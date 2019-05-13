import axios from 'axios'

export async function cargarTodas ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: presupuestos} = await axios.get(`presupuesto/${idProyecto}`)
  commit('agregar', presupuestos)
}

export async function crear ({commit}, {rubro, monto, idProyecto}) {
  const {data: presupuesto} = await axios.post('presupuesto', {rubro, monto, idProyecto})
  commit('agregar', [presupuesto])
}

export async function modificar ({commit}, {rubro, monto, id}) {
  await axios.put(`presupuesto/${id}`, {rubro, monto})
  commit('actualizar', {rubro, monto, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`presupuesto/${id}`)
  commit('eliminar', {id})
}
