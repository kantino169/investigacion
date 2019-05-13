import axios from 'axios'

export async function cargarTodas ({commit}, idProyecto) {
  commit('eliminarTodas')
  const {data: actividades} = await axios.get(`actividades/${idProyecto}`)
  commit('agregar', actividades)
}

export async function crear ({commit}, {actividad, primers, segundos, idProyecto}) {
  const {data: act} = await axios.post('actividades', {actividad, primers, segundos, idProyecto})
  commit('agregar', [act])
}

export async function modificar ({commit}, {actividad, primers, segundos, id}) {
  await axios.put(`actividades/${id}`, {actividad, primers, segundos})
  commit('actualizar', {actividad, primers, segundos, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`actividades/${id}`)
  commit('eliminar', {id})
}
