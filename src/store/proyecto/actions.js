import axios from 'axios'

export async function cargarTodos ({ commit }) {
  const id = this.state.usuario.id
  const { data: proyectos } = await axios.get(`proyecto/todos/${id}`)
  commit('eliminarTodas')
  commit('agregar', proyectos)
}

export async function cargarProyecto ({commit}, idProyecto) {
  const id = idProyecto
  const {data: proyectos} = await axios.get(`proyecto/${id}`)
  commit('agregar', proyectos)
}

export async function cargarModalidades ({commit}) {
  const {data: modalidades} = await axios.get('modalidades')
  commit('cargarModalidades', modalidades)
}

export async function cargarUnidadesAcademicas ({commit}) {
  const {data: unidadesAcademicas} = await axios.get('unidad_academica')
  commit('cargarUnidadesAcademicas', unidadesAcademicas)
}

export async function agregar ({commit}, datos) {
  console.log(datos)
  const {data: proyecto} = await axios.post('proyecto', {datos})
  // commit('agregar', {[proyecto.id]: proyecto})
  console.log(proyecto)
}

export async function eliminar ({ commit }, { id }) {
  await axios.delete(`proyecto/${id}`)
  commit('eliminar', { id })
}

export async function aprobarProyecto ({ commit }, { aprobacion, estado, id }) {
  console.log(estado)
  console.log(aprobacion)
  await axios.put(`proyecto/aprobar/${id}`, {estado, aprobacion})
  commit('modificarEstado', {estado, aprobacion, id})
}
