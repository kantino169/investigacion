import axios from 'axios'

export async function cargarTodas ({commit}, idPlanilla) {
  const {data: horasBecarios} = await axios.get(`horas/${idPlanilla}`)
  commit('eliminarTodas')
  commit('agregar', horasBecarios)
}

export async function crear ({commit}, {idPlanilla, fecha, lugarActividad, horario, hrs, semana}) {
  const {data: horas} = await axios.post('horas', {idPlanilla, fecha, lugarActividad, horario, hrs, semana})
  commit('agregar', [horas])
}

export async function modificar ({commit}, {actividad, primers, segundos, id}) {
  await axios.put(`horas/${id}`, {actividad, primers, segundos})
  commit('actualizar', {actividad, primers, segundos, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`horas/${id}`)
  commit('eliminar', {id})
}
