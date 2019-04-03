import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: presupuestos} = await axios.get('presupuesto')
  commit('agregar', presupuestos)
}

export async function crear ({commit}, {rubro, monto}) {
  const {data: presupuesto} = await axios.post('presupuesto', {rubro, monto})
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
