const armarLista = state => id => ({
  id,
  idRolInvestigador: state[id].idRolInvestigador,
  horasSemanales: state[id].horasSemanales,
  cantidadMeses: state[id].cantidadMeses,
  idProyecto: state[id].idProyecto,
  idUsuario: state[id].idUsuario,
  idCategoria: state[id].idCategoria
})

export const becarios = state =>
  Object.keys(state).map(armarLista(state))
