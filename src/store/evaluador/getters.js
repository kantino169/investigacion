const armarLista = state => id => ({id,
  nombre: state[id].nombre,
  apellido: state[id].apellido,
  email: state[id].email,
  profesion: state[id].profesion,
  especialidad: state[id].especialidad,
  telefono: state[id].telefono,
  dni: state[id].dni,
  lugarTrabajo: state[id].lugar_de_trabajo})

export const evaluadores = state =>
  Object.keys(state).map(armarLista(state))
