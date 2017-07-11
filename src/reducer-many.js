import { snakeCase } from 'lowline'

export default (singular, plural = `${singular}s`) => {
  const pluralUpperCase = snakeCase(plural).toUpperCase()
  const singularUpperCase = snakeCase(singular).toUpperCase()

  const RECEIVE = `RECEIVE_${pluralUpperCase}`
  const REMOVE = `REMOVE_${pluralUpperCase}`
  const REMOVE_SINGLE = `REMOVE_${singularUpperCase}`

  return (state = null, action) => {
    switch (action.type) {
      case RECEIVE:
        return action.payload || []
      case REMOVE:
        return null
    }

    if (!state) return state

    switch (action.type) {
      case REMOVE_SINGLE:
        return state.filter(item => item.id !== action.id)
    }

    return state
  }
}
