import api from './api'

const teacherContestService = {}

teacherContestService.getContestById = id => api.get(`/teacherContests/getContestById/${id}`)

// Teacher
teacherContestService.getContestForUser = () => api.get('/teacherContests/contestForUser')
teacherContestService.getContestPostulations = () => api.get('/teacherContests/contestPostulations')
teacherContestService.getFavouriteContest = () => api.get('/teacherContests/favouriteContest')

export default teacherContestService
