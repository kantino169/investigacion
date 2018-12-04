import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: disciplinas} = await axios.get('disciplina')
  commit('agregar', disciplinas)
}

export async function crear ({commit}, {nombre}) {
  const {data: disciplina} = await axios.post('disciplina', {nombre})
  commit('agregar', {[disciplina.id]: disciplina})
}

export async function modificar ({commit}, {nombre, id}) {
  await axios.put(`disciplina/${id}`, {nombre})
  commit('actualizar', {nombre, id})
}

export async function eliminar ({commit}, {id}) {
  await axios.delete(`disciplina/${id}`)
  commit('eliminar', {id})
}
