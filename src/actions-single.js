import { camelCase, kebabCase } from 'lowline';

export default (name) => {
  const baseUrl = `/api/${kebabCase(name)}`;

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'content-type': 'application/json',
    accept: 'application/json',
  };

  const RECEIVE = `RECEIVE_${name.toUpperCase()}`;
  const REMOVE = `REMOVE_${name.toUpperCase()}`;
  const DELETE = `DELETE_${name.toUpperCase()}`;
  const CREATE = `CREATE_${name.toUpperCase()}`;
  const UPDATE = `UPDATE_${name.toUpperCase()}`;
  const SAVE = `SAVE_${name.toUpperCase()}`;
  const SAVE_FAILURE = `SAVE_${name.toUpperCase()}_FAILURE`;
  const SAVE_SUCCESS = `SAVE_${name.toUpperCase()}_SUCCESS`;

  function del(id) {
    return (dispatch) => {
      fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers,
      }).then((res) => {
        if (res.ok) {
          dispatch(remove(id));
        }
      });
    };
  }

  function receive(json) {
    return {
      type: RECEIVE,
      payload: json,
      receivedAt: Date.now(),
    };
  }

  function create(json) {
    return (dispatch) => {
      fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(json),
        credentials: 'same-origin',
        headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      }).then((json) => {
        dispatch(receive(json));
      });
    };
  }

  function remove(id) {
    return {
      type: REMOVE,
      id,
    };
  }

  function save(id, json) {
    if (typeof id === 'object') {
      json = id;
      id = json.id;
    }

    if (!id) return;

    return (dispatch) => {
      dispatch(update(id, json));

      fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(json),
        credentials: 'same-origin',
        headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      }).then(() => {
        dispatch(saveSuccess(id));
      }).catch(() => {
        dispatch(saveFailure(id));
      });
    };
  }

  function saveFailure(id) {
    return {
      type: SAVE_FAILURE,
      id,
    };
  }

  function saveSuccess(id) {
    return {
      type: SAVE_SUCCESS,
      id,
    };
  }

  function update(id, json) {
    return {
      type: UPDATE,
      id: id,
      payload: json,
    };
  }

  return {
    [RECEIVE]: RECEIVE,

    [`receive${camelCase(name)}`]: receive,

    [REMOVE]: REMOVE,

    [`remove${camelCase(name)}`]: remove,

    [DELETE]: DELETE,

    [`delete${camelCase(name)}`]: del,

    [CREATE]: CREATE,

    [`create${camelCase(name)}`]: create,

    [UPDATE]: UPDATE,

    [`update${camelCase(name)}`]: update,

    [SAVE]: SAVE,

    [`save${camelCase(name)}`]: save,

    [SAVE_FAILURE]: SAVE_FAILURE,

    [`save${camelCase(name)}Failure`]: saveFailure,

    [SAVE_SUCCESS]: SAVE_SUCCESS,

    [`save${camelCase(name)}Success`]: saveSuccess,
  };
};
