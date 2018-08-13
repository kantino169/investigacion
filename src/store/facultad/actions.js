import * as api from '../api'

export const loadAll = async ({commit}) => {
  const facultades = await api.getFacultades()
  commit('removeAll')
  commit('addOrUpdate', facultades)
}
