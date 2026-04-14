import axios from 'axios'

// 生产环境用 VITE_API_URL，开发环境为空（走 Vite proxy）
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
})

export default request