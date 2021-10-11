import api from './api'

const userService = {}

userService.getUserByToken = () => api.get('/users/me')
userService.updateUserByToken = (payload) => api.put('/users/me', {...payload})
userService.updateUserImgByToken = (payload) => api.put('/users/me/img', {...payload})
userService.getUsersByUniversity = () => api.get('/users/getUniversityUsers')

export default userService
