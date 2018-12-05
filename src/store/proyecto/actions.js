import axios from 'axios'

export async function cargarModalidades ({commit}) {
  const {data: modalidades} = await axios.get('modalidades')
  commit('cargarModalidades', modalidades)
}

export async function cargarUnidadesAcademicas ({commit}) {
  const {data: unidadesAcademicas} = await axios.get('unidad_academica')
  commit('cargarUnidadesAcademicas', unidadesAcademicas)
}

export async function agregar ({commit}, datos) {
  const {data: proyecto} = await axios.post('proyecto', {datos})
  commit('agregar', {[proyecto.id]: proyecto})
}
