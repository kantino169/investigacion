const headers = new Headers({
  'Content-Type': 'application/json'
})

const base = 'http://192.168.1.117:3000/api'

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

export const changePassword = ({oldPassword, newPassword, email}) => post('users', {oldPassword, newPassword, email}, 'PUT')

export const userList = () => get('usuarios')

export const createUser = ({email, password}) => post('users', {email, password})

export const removeUser = (_id) => post(`usuarios/${_id}`, {}, 'DELETE')

export const getGroups = () => get('grupo')
