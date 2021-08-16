import api from './api'

const favouriteService = {}

favouriteService.getFavouritesForUser = () => api.get('/favourites/favouritesForUser')
favouriteService.save = payload => api.post('/favourites', { ...payload })
favouriteService.deleteFavourite = id => api.delete(`/favourites/deleteByContestId/${id}`)

export default favouriteService
