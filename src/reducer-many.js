export default (plural, singular = plural.slice(0, -1)) => {
  const RECEIVE = `RECEIVE_${plural.toUpperCase()}`;
  const REMOVE = `REMOVE_${plural.toUpperCase()}`;
  const REMOVE_SINGLE = `REMOVE_${singular.toUpperCase()}`;

  return (state = null, action) => {
    switch (action.type) {
      case RECEIVE:
        return action.payload || [];
      case REMOVE:
        return null;
    }

    if (!state) return state;

    switch (action.type) {
      case REMOVE_SINGLE:
        return state.filter((item) => item.id !== action.id);
    }

    return state;
  };
};
