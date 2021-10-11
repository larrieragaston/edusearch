import api from './api'

const subjectService = {}

subjectService.getSubjectsByUniversity = () => api.get(`/subjects/getSubjectsByUniversity`)
// subjectService.postScore = payload => api.post('/subjects/create', { ...payload })
// subjectService.putScore = (id, payload) => api.put(`/subjects/updateById/${id}`, { ...payload })

export default subjectService
