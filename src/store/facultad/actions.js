import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: facultades} = await axios.get('facultad')
  commit('eliminarTodas')
  commit('agregar', facultades)
}

export async function crearFacultad ({commit}, {nombre}) {
  const {data: facultad} = await axios.post('facultad', {nombre})
  commit('agregar', {[facultad.id]: facultad})
}

export async function crearCarrera ({commit}, {nombre}, {}) {
  const {data: carrera} = await axios.post('grupo', {nombre}, {facultad})
}
