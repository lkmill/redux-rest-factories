export default (singular) => {
  const UPDATE = `UPDATE_${singular.toUpperCase()}`
  const RECEIVE = `RECEIVE_${singular.toUpperCase()}`
  const REMOVE = `REMOVE_${singular.toUpperCase()}`

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
