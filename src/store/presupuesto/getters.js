const armarLista = state => id => ({id, rubro: state[id].rubro, monto: state[id].monto})

export const presupuestos = state =>
  Object.keys(state).map(armarLista(state))
