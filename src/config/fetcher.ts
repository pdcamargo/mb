import Axios from 'axios'

const urls = {
  development: 'http://localhost:8000/',
  production: 'https://api.mybrief.io/'
}
const fetcher = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default fetcher
