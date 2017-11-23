import axios from 'axios'

let api = axios.create({
  baseURL: 'http://192.168.50.107:3000/api/'
})

export function setInstance (url) {
  api = axios.create({
    baseURL: `http://${url}:3000/api/`
  })
}

function process (promise) {
  return promise.then(r => r.data)
}

export async function getModalidades () {
  const modalidades = await process(api.get('modalidades'))
  return modalidades
}

export async function getGrupoLineaDeInvestigacion () {
  const grupos = await process(api.get('grupo'))
  return grupos
}

export async function getLineasDeInvestigacion () {
  const lineas = await process(api.get('linea_investigacion'))
  return lineas
}

export async function getUnidadesAcademicas () {
  const unidades = await process(api.get('unidad_academica'))
  return unidades
}
export async function getDisciplinasDeEstudio () {
  const disciplinas = await process(api.get('disciplina'))
  return disciplinas
}
export async function mandarFormularioProyecto (proyecto) {
  await api.post('proyecto', proyecto)
}
export async function getProyectos () {
  const proyectos = await process(api.get('proyecto'))
  return proyectos
}
export async function getProyecto (id) {
  const proyecto = await process(api.get(`proyecto/${id}`))
  proyecto.grupo = undefined
  return proyecto
}
export async function editFormularioProyecto (proyecto) {
  await process(api.put(`proyecto/${proyecto.id}`, proyecto))
}
export async function deleteProyecto (id) {
  await api.delete(`proyecto/${id}`)
}
