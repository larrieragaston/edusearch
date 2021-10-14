import api from './api'

const postulationService = {}

postulationService.getPostulationsForUser = () => api.get('/postulations/postulationsForUser')
postulationService.postulate = payload => api.post('/postulations', { ...payload })
postulationService.getLastPostulations = () => api.get('/postulations/postulationsForUniversity')

export default postulationService
