const armarLista = state => id => ({id, actividad: state[id].actividad, primers: state[id].primers, segundos: state[id].segundos})

export const actividades = state =>
  Object.keys(state).map(armarLista(state))
