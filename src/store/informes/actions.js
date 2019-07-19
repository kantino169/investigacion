import axios from 'axios'

export async function crear ({commit}, {etapa, estado, idProyecto, nroInforme, articulos, actividades, comunicaciones, revistas, libros, capitulos}) {
  const {data: informe} = await axios.post('informes', {etapa, estado, idProyecto, nroInforme, articulos, actividades, comunicaciones, revistas, libros, capitulos})
  commit('agregar', [informe])
}

export async function modificar ({commit}, {id, etapa, estado, articulos, actividades}) {
  await axios.put(`informes/${id}`, {id, etapa, estado, articulos, actividades})
  commit('actualizar', {id, etapa, estado, articulos, actividades})
}

export async function cargarTodos ({commit}) {
  commit('eliminarTodas')
  const {data: informe} = await axios.get('informes')
  commit('agregar', [informe])
}

export async function cargarPrimerInforme ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: informe} = await axios.get(`informes/primerInforme/${idProyecto}`)
  commit('agregar', [informe])
}

export async function cargarSegundoInforme ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: informe} = await axios.get(`informes/segundoInforme/${idProyecto}`)
  commit('agregar', [informe])
}

export async function cargarInformeFinal ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: informe} = await axios.get(`informes/informeFinal/${idProyecto}`)
  commit('agregar', [informe])
}
