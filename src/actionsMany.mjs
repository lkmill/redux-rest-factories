import { snakeCase } from 'lowline'

export default (singular, plural = `${singular}s`) => {
  const upperCase = snakeCase(plural).toUpperCase()

  const RECEIVE = `RECEIVE_${upperCase}`

  const REMOVE = `REMOVE_${upperCase}`

  function receive (json) {
    return {
      type: RECEIVE,
      payload: json,
      receivedAt: Date.now()
    }
  }

  function remove () {
    return {
      type: REMOVE
    }
  }

  return {
    RECEIVE,
    REMOVE,
    receive,
    remove
  }
}
