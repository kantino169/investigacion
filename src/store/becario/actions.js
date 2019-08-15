import axios from 'axios'

export async function cargarTodos ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: becarios} = await axios.get(`becarios/${idProyecto}`)
  commit('agregar', becarios)
}

export async function crear ({commit}, {idRolInvestigador, horasSemanales, cantidadMeses, idProyecto, bec, idCategoria}) {
  const {data: act} = await axios.post('becarios', {idProyecto, idRolInvestigador, horasSemanales, cantidadMeses, bec, idCategoria})
  commit('agregar', [act])
}

export async function modificar ({commit}, {idRolInvestigador, horasSemanales, cantidadMeses, idCategoria, id}) {
  await axios.put(`becarios/${id}`, {idRolInvestigador, horasSemanales, cantidadMeses, idCategoria})
  commit('actualizar', {idRolInvestigador, horasSemanales, cantidadMeses, idCategoria, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`becarios/${id}`)
  commit('eliminar', {id})
}

export async function aprobacion ({commit}, {id}) {
  await axios.put(`becarios/aprobar/${id}`)
  commit('actualizar', {aprobacionBecario: 1})
}
