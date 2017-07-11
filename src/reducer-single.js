import { snakeCase } from 'lowline'

export default (singular) => {
  const upperCase = snakeCase(singular).toUpperCase()

  const UPDATE = `UPDATE_${upperCase}`
  const RECEIVE = `RECEIVE_${upperCase}`
  const REMOVE = `REMOVE_${upperCase}`

  return (state = null, action) => {
    switch (action.type) {
      case RECEIVE:
        return action.payload || null
      case REMOVE:
        return null
    }

    if (!state || state.id !== action.id) {
      return state
    }

    switch (action.type) {
      case UPDATE:
        return Object.assign({}, state, action.payload)
      default:
        return state
    }
  }
}
