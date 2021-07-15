import api from './api'

const sessionService = {}

sessionService.create = (email, password) => api.post('/users/login', { email, password })

sessionService.forgotPassword = email => api.post(`/auth/forgot-password/${email}`)

export default sessionService
