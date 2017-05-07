import { camelCase } from 'lowline';

export default (name) => {
  const RECEIVE = `RECEIVE_${name.toUpperCase()}`;

  const REMOVE = `REMOVE_${name.toUpperCase()}`;

  function receive(json) {
    return {
      type: RECEIVE,
      payload: json,
      receivedAt: Date.now(),
    };
  }

  function remove() {
    return {
      type: REMOVE,
    };
  }

  return {
    [RECEIVE]: RECEIVE,

    [`receive${camelCase(name)}`]: receive,

    [`remove${camelCase(name)}`]: remove,
  };
};
