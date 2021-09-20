import api from './api'

const scoreService = {}

scoreService.getScores = () => api.get(`/scores/getScores`)
scoreService.postScore = payload => api.post('/degrees/create', { ...payload })
scoreService.putScore = (id, payload) => api.put(`/degrees/updateById/${id}`, { ...payload })

export default scoreService
