import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: fechasEntrega} = await axios.get('cronograma')
  commit('agregar', fechasEntrega)
}
