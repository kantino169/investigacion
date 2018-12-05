import axios from 'axios'

export async function cargarTodos ({ commit }) {
  const { data: evaluadores } = await axios.get('evaluadores')
  commit('agregar', evaluadores)
}

export async function crear (
  { commit },
  {
    nombre,
    apellido,
    email,
    telefono,
    profesion,
    especialidad,
    dni,
    lugarTrabajo
  }
) {
  const { data: evaluador } = await axios.post('evaluadores', {
    nombre,
    apellido,
    email,
    telefono,
    profesion,
    especialidad,
    dni,
    lugarTrabajo
  })
  commit('agregar', [evaluador])
}

export async function modificar (
  { commit },
  {
    nombre,
    id,
    apellido,
    email,
    telefono,
    profesion,
    especialidad,
    dni,
    lugarTrabajo
  }
) {
  const { data: evaluador } = await axios.put(`evaluadores/${id}`, {
    nombre,
    apellido,
    email,
    telefono,
    profesion,
    especialidad,
    dni,
    lugarTrabajo
  })
  commit('actualizar', evaluador)
}

export async function eliminar ({ commit }, { id }) {
  const {
    data: { success }
  } = await axios.delete(`evaluadores/${id}`)
  if (success) commit('eliminar', { id })
  return success
}
