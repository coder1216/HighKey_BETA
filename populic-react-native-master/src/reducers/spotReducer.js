export default function reducer(
  state = {
    name: '',
    user: '',
    latitude: null,
    longitude: null,
    modalOpen: false,
    newPostActive: false,
    pinnedGroups: []
  },
  action
) {
  switch (action.type) {
    case 'SET_INFO': {
      return {
        ...state,
        name: action.payload.name,
        user: action.payload.user,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        newPostActive: true,
        modalOpen: false
      };
    }
    case 'TOGGLE_MODAL': {
      return {
        ...state,
        modalOpen: action.payload
      };
    }
    case 'FETCH_PINNED_SUCCESS': {
      return {
        ...state,
        pinnedGroups: action.payload
      };
    }
    default:
      return state;
  }
}
