const armarLista = state => id => ({id, nombre: state[id].nombre})
const armarLista2 = state => id => ({
  id,
  titulo: state[id].titulo,
  idModalidad: state[id].idModalidad,
  idDirector: state[id].idDirector,
  resumen: state[id].resumen,
  aprobado1: state[id].aprobado1,
  aprobado2: state[id].aprobado2,
  aprobado3: state[id].aprobado3,
  aprobado4: state[id].aprobado4,
  aprobado5: state[id].aprobado5
})

export const modalidades = state =>
  Object.keys(state).map(armarLista(state))

export const unidadesAcademicas = state =>
  Object.keys(state).map(armarLista(state))

export const proyectos = state =>
  Object.keys(state).map(armarLista2(state))
