const armarLista = state => id => ({id, idBecario: state[id].idBecario, mes: state[id].mes, cantidadHoras: state[id].cantidadHoras, codigo: state[id].codigo, idProyecto: state[id].idProyecto})

export const planillas = state =>
  Object.keys(state).map(armarLista(state))
