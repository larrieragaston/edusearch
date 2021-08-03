import api from './api'

const contestService = {}

contestService.getContestById = id => api.get(`/contests/getContestById/${id}`)

// Teacher
contestService.getContestForUser = () => api.get('/contests/contestForUser')
contestService.getContestPostulations = () => api.get('/contests/contestPostulations')
contestService.getFavouriteContest = () => api.get('/contests/favouriteContest')

export default contestService
