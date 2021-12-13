import api from './api'

const universityService = {}

universityService.getUniversityByUser = () => api.get(`/universities/getUniversityByUser`)
universityService.updateUniversityByUser = (payload) => api.put(`/universities/updateUniversityByUser`, { ...payload })
universityService.getSubjectsByUniversity = id => api.get(`/universities/getSubjectsByUniversity/${id}`)
universityService.getDashboardInfo = () => api.get(`/universities/getDashboardInfoByUniversity`)
universityService.getContestsToClose = () => api.get(`/universities/getContestsToCloseByUniversity`)

export default universityService
