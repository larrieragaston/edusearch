import api from './api'

const contestService = {}

contestService.getContestById = id => api.get(`/contests/getContestById/${id}`)
contestService.getPostulationsByContest = id => api.get(`/contests/getPostulationsByContest/${id}`)

// Teacher
contestService.getContestForUser = () => api.get('/contests/contestsForUser')
contestService.getContestPostulations = () => api.get('/contests/postulationsForUser')
contestService.getFavouriteContest = () => api.get('/contests/favouriteForUser')
contestService.getClosedContest = () => api.get('/contests/closedForUser')

// University
contestService.create = (payload) => api.post(`/contests/createContest`, { ...payload })
contestService.edit = (id, payload) => api.put(`/contests/editContest/${id}`, { ...payload })
contestService.nextStage = id => api.put(`/contests/nextStage/${id}`)
contestService.closeContest = id => api.put(`/contests/closeContest/${id}`)
contestService.getDraftContestsForUniversity = () => api.get('/contests/draftContestsForUniversity')
contestService.getActiveContestsForUniversity = () => api.get('/contests/activeContestsForUniversity')
contestService.getEndedContestsForUniversity = () => api.get('/contests/endedContestsForUniversity')

export default contestService
