import api from './api'

const scoreService = {}

scoreService.getScores = () => api.get(`/scores/getScores`)
scoreService.postScore = payload => api.post('/scores/create', { ...payload })
scoreService.putScore = (id, payload) => api.put(`/scores/updateById/${id}`, { ...payload })

export default scoreService
