import api from './api'

const universityService = {}

universityService.getUniversityByUser = () => api.get(`/universities/getUniversityByUser`)
universityService.updateUniversityByUser = (payload) => api.put(`/universities/updateUniversityByUser`, { ...payload })

export default universityService
