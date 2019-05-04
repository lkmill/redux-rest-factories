import { kebabCase, snakeCase } from 'lowline'

export default (singular, plural = `${singular}s`, urlRoot = '/api') => {
  const baseUrl = `${urlRoot}/${kebabCase(plural)}`

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/json',
    accept: 'application/json'
  }

  const upperCase = snakeCase(singular).toUpperCase()

  const RECEIVE = `RECEIVE_${upperCase}`
  const REMOVE = `REMOVE_${upperCase}`
  const DELETE = `DELETE_${upperCase}`
  const CREATE = `CREATE_${upperCase}`
  const UPDATE = `UPDATE_${upperCase}`
  const SAVE = `SAVE_${upperCase}`
  const SAVE_FAILURE = `SAVE_${upperCase}_FAILURE`
  const SAVE_SUCCESS = `SAVE_${upperCase}_SUCCESS`

  function del (id) {
    return (dispatch) => {
      fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers
      }).then((res) => {
        if (res.ok) {
          dispatch(remove(id))
        }
      })
    }
  }

  function receive (json) {
    return {
      type: RECEIVE,
      payload: json,
      receivedAt: Date.now()
    }
  }

  function create (json) {
    return (dispatch) => {
      fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(json),
        credentials: 'same-origin',
        headers
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
      }).then((json) => {
        dispatch(receive(json))
      })
    }
  }

  function remove (id) {
    return {
      type: REMOVE,
      id
    }
  }

  function save (id, json) {
    if (typeof id === 'object') {
      json = id
      id = json.id
    }

    // TODO throw error when no id
    if (!id) return

    return (dispatch) => {
      dispatch(update(id, json))

      fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(json),
        credentials: 'same-origin',
        headers
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
      }).then(() => {
        dispatch(saveSuccess(id))
      }).catch(() => {
        dispatch(saveFailure(id))
      })
    }
  }

  function saveFailure (id) {
    return {
      type: SAVE_FAILURE,
      id
    }
  }

  function saveSuccess (id) {
    return {
      type: SAVE_SUCCESS,
      id
    }
  }

  function update (id, json) {
    return {
      type: UPDATE,
      id,
      payload: json
    }
  }

  return {
    CREATE,
    DELETE,
    RECEIVE,
    REMOVE,
    SAVE,
    SAVE_FAILURE,
    SAVE_SUCCESS,
    UPDATE,
    create,
    del,
    receive,
    remove,
    save,
    saveFailure,
    saveSuccess,
    update
  }
}
