import axios from 'axios'

const apiDevBurger = axios.create({
  baseURL: 'http://localhost:3001'
})
export default apiDevBurger
