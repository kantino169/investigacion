import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.1.34:3000/api/'
})

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
