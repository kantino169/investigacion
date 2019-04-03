import axios from 'axios'

export async function cargarTodas ({commit}) {
  const {data: fechasEntrega} = await axios.get('cronograma')
  commit('agregar', fechasEntrega)
}
export async function crear (
  { commit },
  {
    año,
    convocatoria,
    fechaLimite,
    prorroga,
    informe1,
    informe2,
    informe3
  }
) {
  const { data: fecha } = await axios.post('cronograma', {
    año,
    convocatoria,
    fechaLimite,
    prorroga,
    informe1,
    informe2,
    informe3
  })
  commit('agregar', [fecha])
}
