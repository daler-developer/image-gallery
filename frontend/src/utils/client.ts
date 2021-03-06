import axios from 'axios'

const client = axios.create({})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token')

  if (token) {
    config.headers['authorization'] = 'Bearer ' + token
  }

  return config
})

export default client
