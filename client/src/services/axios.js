import axios from 'axios'

const config = {
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://localhost:5000'
}
const axiosInstance = axios.create(config)

export default axiosInstance
