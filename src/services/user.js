import api from './api'

const userService = {}

// userService.create = payload => api.post('/users', { ...payload })

// userService.update = (userId, payload) => api.put(`/users/${userId}`, { ...payload })

// userService.getUsers = () => api.get('/users')

userService.getUserByToken = () => api.get('/users/me')
userService.getPersonalInformation = () => api.get('/users/personalInformation')

// userService.getPatients = () => api.get('/users/patients')
// userService.getDoctors = () => api.get('/users/doctors')
// userService.registerPatient = payload => api.post('/register-patient', { ...payload })
// userService.deleteById = userId => api.delete(`/users/${userId}`)

export default userService
