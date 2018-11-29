import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/'

export const setToken = token => { axios.defaults.headers.token = token }
