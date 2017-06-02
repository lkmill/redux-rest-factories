export default (singular, plural = `${singular}s`) => {
  const RECEIVE = `RECEIVE_${plural.toUpperCase()}`

  const REMOVE = `REMOVE_${plural.toUpperCase()}`

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
