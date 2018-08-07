const headers = new Headers({
  'Content-Type': 'application/json'
})

const base = 'http://192.168.1.116:3000/api'

const get = (url) => fetch(`${base}/${url}`, {headers})
  .then(r => r.json())
  .then(r => r.error ? Promise.reject(r.error) : r)

const post = (url, datos, method = 'POST') => fetch(`${base}/${url}`, {headers, method, body: JSON.stringify(datos)})
  .then(r => r.json())
  .then(r => r.error ? Promise.reject(r.error) : r)
  // .catch(e => console.error(e))

export const setToken = token => token ? headers.set('token', token) : headers.delete('token')

// export const login = datos => post('users/session', datos)
export const login = (datos) => post('usuarios/session', datos)

export const signup = (datos) => post('usuarios', datos)

// export const logout = () => post('users/session', {}, 'DELETE').catch(() => undefined).then(setToken)

export const changePassword = (data) => post('usuarios/password', data, 'PUT')

export const userList = () => get('usuarios')

export const createUser = ({email, password}) => post('users', {email, password})

export const getGroups = () => get('grupo')

export const createGroup = (data) => post('grupo', data)

export const updateGroup = (data) => post('grupo', data, 'PUT')

export const deleteGroup = (_id) => post(`grupo/${_id}`, {}, 'DELETE')

// lineas de investigacion
export const getLineasDeInvestigacion = () => get('linea_investigacion')

export const createInvestigationLine = (data) => post('linea_investigacion', data)

export const updateInvestigationLine = (data) => post('linea_investigacion', data, 'PUT')

export const deleteLine = (_id) => post(`linea_investigacion/${_id}`, {}, 'DELETE')

// disciplinas de estudio
export const getDisciplinasDeEstudio = () => get('disciplina')

export const createDiscipline = (data) => post('disciplina', data)

export const updateDiscipline = (data) => post('disciplina', data, 'PUT')

export const deleteDiscipline = (_id) => post(`disciplina/${_id}`, {}, 'DELETE')

// usuarios
export const removeUser = (id) => post(`usuarios/${id}`, {}, 'DELETE')

export const updateUser = (data) => post('usuarios', data, 'PUT')

export const giveAccess = (data) => post('usuarios/privilegios', data, 'PUT')

// export const updatePassword = (data) => post('usuarios/contraseña', data, 'PUT')
