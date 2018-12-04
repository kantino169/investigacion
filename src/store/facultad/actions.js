import axios from 'axios'
const path = ['facultad', 'carrera', 'grupo', 'subgrupo', 'linea']

export async function cargarTodas ({commit}) {
  const {data: facultades} = await axios.get('facultad')
  commit('eliminarTodas')
  commit('agregar', facultades)
}

export async function crearFacultad ({commit}, {nombre}) {
  const {data: facultad} = await axios.post('facultad', {nombre})
  commit('agregar', {[facultad.id]: facultad})
}

export async function crearCarrera ({commit}, {nombre, idFacultad}) {
  const {data: carrera} = await axios.post('carrera', {nombre, idFacultad})
  commit('agregarCarrera', carrera)
}

export async function crearGrupo ({commit}, {nombre, idCarrera}) {
  const {data: grupo} = await axios.post('grupo', {nombre, idCarrera})
  commit('agregarGrupo', grupo)
}

export async function crearSubgrupo (store, {nombre, idGrupo}) {
  const {data: subgrupo} = await axios.post('subgrupo', {nombre, idGrupo})
  store.commit('agregarSubgrupo', subgrupo)
}

export async function crearLinea ({commit}, {nombre, idSubgrupo}) {
  const {data: linea} = await axios.post('linea', {nombre, id_subgrupo: idSubgrupo})
  commit('agregarLinea', linea)
}

export async function modificar ({commit}, {nombre, id, tipo}) {
  if (!path.includes(tipo)) return
  await axios.put(`${tipo}/${id}`, {nombre})
  commit('actualizar', {nombre, id, altura: path.indexOf(tipo)})
}

export async function eliminar ({commit}, {id, tipo}) {
  if (!path.includes(tipo)) return
  await axios.delete(`${tipo}/${id}`)
  commit('eliminar', {id, altura: path.indexOf(tipo)})
}

export function eliminarFacultad ({dispatch}, {id}) {
  return dispatch('eliminar', {id, tipo: 'facultad'})
}

export async function modificarFacultad ({commit}, {nombre, id}) {
  await axios.put(`facultad/${id}`, {nombre})
  commit('actualizar', {nombre, id, altura: 0})
}

export async function modificarCarrera ({commit}, {nombre, id}) {
  await axios.put(`carrera/${id}`, {nombre})
  commit('actualizar', {nombre, id, altura: 1})
}

export async function modificarGrupo ({commit}, {nombre, id}) {
  commit('actualizar', {nombre, id, altura: 2})
}

export async function modificarSubgrupo ({commit}, {nombre, id}) {
  commit('actualizar', {nombre, id, altura: 3})
}

export async function modificarLinea ({commit}, {nombre, id}) {
  commit('actualizar', {nombre, id, altura: 4})
}
