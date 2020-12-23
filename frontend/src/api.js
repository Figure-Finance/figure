import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
  // baseURL: 'http://localhost:80/api'
})

export default api
