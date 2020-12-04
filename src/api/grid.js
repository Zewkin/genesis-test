import axios from 'axios'
import { API_URL } from '../config/constants'

export default {
  async getData() {
    const data = await axios.get(`${API_URL}/data.json`)
    return data.data
  }
}