import axios from 'axios'

export async function loadAll ({commit}) {
  const facultades = await axios.get('facultad')
  commit('removaAll')
  commit('add', facultades)
}
