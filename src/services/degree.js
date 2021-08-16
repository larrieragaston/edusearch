import api from './api'

const degreeService = {}

degreeService.postDegree = payload => api.post('/degrees/create', { ...payload })
degreeService.putDegree = (id, payload) => api.put(`/degrees/updateById/${id}`, { ...payload })
degreeService.deleteDegree = id => api.delete(`/degrees/deleteById/${id}`)

export default degreeService
