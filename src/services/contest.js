import api from './api'

const contestService = {}

contestService.getContestById = id => api.get(`/contests/getContestById/${id}`)

// Teacher
contestService.getContestForUser = () => api.get('/contests/contestsForUser')
contestService.getContestPostulations = () => api.get('/contests/postulationsForUser')
contestService.getFavouriteContest = () => api.get('/contests/favouriteForUser')

// University
contestService.create = (payload) => api.post(`/contests/createContest`, { ...payload })
contestService.edit = (id, payload) => api.put(`/contests/editContest/${id}`, { ...payload })
contestService.nextStage = id => api.put(`/contests/nextStage/${id}`)
contestService.getDraftContestsForUniversity = () => api.get('/contests/draftContestsForUniversity')
contestService.getActiveContestsForUniversity = () => api.get('/contests/activeContestsForUniversity')
contestService.getEndedContestsForUniversity = () => api.get('/contests/endedContestsForUniversity')
contestService.getPostulationsByContest = id => api.get(`/contests/getPostulationsByContest/${id}`)

export default contestService
