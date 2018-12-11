import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.7:3000/api/'

export const setToken = token => { axios.defaults.headers.token = token }
