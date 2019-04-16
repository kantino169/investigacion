import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: roles} = await axios.get('rol_investigador')
  commit('agregar', roles)
}

export async function crear ({commit}, {rol}) {
  const {data: rolInvestigador} = await axios.post('rol_investigador', {rol})
  commit('agregar', [rolInvestigador])
}

export async function modificar ({commit}, {rol, id}) {
  await axios.put(`rol_investigador/${id}`, {rol})
  commit('actualizar', {rol, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`rol_investigador/${id}`)
  commit('eliminar', {id})
}
