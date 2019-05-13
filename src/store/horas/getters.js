const armarLista = state => id => ({id, fecha: state[id].fecha, mes: state[id].mes, lugarActividad: state[id].lugarActividad, horario: state[id].horario, hrs: state[id].hrs, semana: state[id].semana, idProyectoAlumno: state[id].idProyectoAlumno})

export const horasBecarios = state =>
  Object.keys(state).map(armarLista(state))
