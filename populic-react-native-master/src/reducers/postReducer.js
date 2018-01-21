export default function reducer(
  state = {
    path: '',
    spot: '',
    loading: false,
    error: false,
    posts: [],
    isPinned: false,
    opened: false
  },
  action
) {
  switch (action.type) {
    case 'SET_PATH': {
      return {
        ...state,
        path: action.payload
      };
    }
    case 'SET_TEXT': {
      return {
        ...state,
        locText: action.payload
      };
    }
    case 'SPOT_SELECTED': {
      return {
        ...state,
        spot: action.payload
      };
    }
    case 'CAROUSEL_OPEN': {
      return {
        ...state,
        opened: action.payload
      };
    }
    case 'CAROUSEL_CLOSED': {
      return {
        ...state,
        opened: action.payload
      };
    }
    case 'MEDIA_SAVE_STARTED': {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case 'MEDIA_SAVE_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false
      };
    }
    case 'MEDIA_SAVE_FAIL': {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case 'FETCH_POSTS': {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case 'FETCH_POSTS_SUCCESS': {
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        error: false,
        isPinned: action.payload.isPinned
      };
    }
    case 'PINNED_SPOT_UPDATE': {
      return {
        ...state,
        isPinned: true
      };
    }
    case 'FETCH_POSTS_FAIL': {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    default:
      return state;
  }
}
