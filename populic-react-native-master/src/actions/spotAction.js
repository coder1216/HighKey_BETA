export function setInfo(data) {
  return {
    type: 'SET_INFO',
    payload: {
      name: data.name,
      user: data.user,
      latitude: data.latitude,
      longitude: data.longitude
    }
  };
}

export function toggleModal(data) {
  return {
    type: 'TOGGLE_MODAL',
    payload: data
  };
}

export function pinnedGroups(data) {
  return {
    type: 'FETCH_PINNED_SUCCESS',
    payload: data
  };
}
