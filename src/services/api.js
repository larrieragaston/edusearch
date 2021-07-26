import axios from 'axios'
import { navigate } from '@reach/router'
import { apiBaseUrl, apiTimeout } from '../constants'
import localStorage from './localStorage'

function errorMessage(err) {
  if (err.response && err.response.status === 401) {
    localStorage.delete()
    navigate('/login')
  }
  if (err.response && err.response.status === 403) {
    navigate('/403')
  }
  if (err.response && err.response.status === 404) {
    navigate('/404')
  }
  if (err.response && err.response.status === 500) {
    navigate('/500')
  }
  return err
}

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: apiTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    // Do something before request is sent
    const data = localStorage.get()
    if (data) {
      // eslint-disable-next-line no-param-reassign
      config.headers.common.Authorization = `${data.token}`
    }
    return config
  },
  error =>
    // Do something with request error
    Promise.reject(error)
)

// Add a response interceptor
api.interceptors.response.use(
  response =>
    // Do something with response data
    response.data,
  error =>
    // Do something with response error
    Promise.reject(errorMessage(error))
)

export default api
