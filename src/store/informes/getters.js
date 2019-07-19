const armarLista = state => id => ({
  id,
  estado: state[id].estado,
  etapa: state[id].etapa,
  idProyecto: state[id].idProyecto,
  nroInforme: state[id].nroInforme,
  descripcion: state[id].descripcion,
  actividades: state[id].actividades,
  articulos: state[id].articulos,
  comunicaciones: state[id].comunicaciones,
  revistas: state[id].revistas,
  libros: state[id].libros,
  capitulos: state[id].capitulos
})

export const informes = state =>
  Object.keys(state).map(armarLista(state))
