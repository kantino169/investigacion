import axios from 'axios'

export async function cargarTodas ({commit}, {semana}) {
  const {data: horasBecarios} = await axios.get('horas', {semana})
  commit('agregar', horasBecarios)
}

export async function crear ({commit}, {fecha, mes, lugarActividad, horario, hrs, semana}) {
  const {data: horas} = await axios.post('horas', {fecha, mes, lugarActividad, horario, hrs, semana})
  commit('agregar', [horas])
}

export async function modificar ({commit}, {actividad, primers, segundos, id}) {
  await axios.put(`actividades/${id}`, {actividad, primers, segundos})
  commit('actualizar', {actividad, primers, segundos, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`horas/${id}`)
  commit('eliminar', {id})
}
