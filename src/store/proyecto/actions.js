import axios from 'axios'

export async function cargarModalidades ({commit}) {
  const {data: modalidades} = await axios.get('modalidades')
  commit('cargarModalidades', modalidades)
}
