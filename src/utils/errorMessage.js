import get from 'lodash/get'

export default function(err) {
  return get(err, 'response.data.message') ? err.response.data.message : get(err, 'response.data') || 'Server Error'
}
