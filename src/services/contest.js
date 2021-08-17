import api from './api'

const contestService = {}

contestService.getContestById = id => api.get(`/contests/getContestById/${id}`)

// Teacher
contestService.getContestForUser = () => api.get('/contests/contestsForUser')
contestService.getContestPostulations = () => api.get('/contests/postulationsForUser')
contestService.getFavouriteContest = () => api.get('/contests/favouriteForUser')

export default contestService
