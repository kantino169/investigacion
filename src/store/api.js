const headers = new Headers({
  'Content-Type': 'application/json'
})

const base = 'http://192.168.1.42:3000/api'

const get = (url) => fetch(`${base}/${url}`, {headers})
  .then(r => r.json())
  .then(r => r.error ? Promise.reject(r.error) : r)

const post = (url, datos, method = 'POST') => fetch(`${base}/${url}`, {headers, method, body: JSON.stringify(datos)})
  .then(r => r.json())
  .then(r => r.error ? Promise.reject(r.error) : r)
  // .catch(e => console.error(e))

export const setToken = token => token ? headers.set('token', token) : headers.delete('token')

// export const login = datos => post('users/session', datos)
export const login = ({email}) => Promise.resolve({email, token: '123', _id: 'hola'})

// export const logout = () => post('users/session', {}, 'DELETE').catch(() => undefined).then(setToken)

export const changePassword = ({oldPassword, newPassword, email}) => post('users', {oldPassword, newPassword, email}, 'PUT')

export const userList = () => get('users')

export const createUser = ({email, password}) => post('users', {email, password})

export const removeUser = (_id) => post(`users/${_id}`, {}, 'DELETE')
