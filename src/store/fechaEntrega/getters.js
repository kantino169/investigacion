const armarLista = state => id => ({
  id,
  año: state[id].año,
  convocatoria: state[id].convocatoria,
  fecha_limite: state[id].fecha_limite,
  prorroga: state[id].prorroga,
  informe1: state[id].informe1,
  informe2: state[id].informe2,
  informe3: state[id].informe3
})

export const fechasEntrega = state =>
  Object.keys(state).map(armarLista(state))
