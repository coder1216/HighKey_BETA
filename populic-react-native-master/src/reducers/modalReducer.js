export default function reducer(
  state = {
    publicModalVisible: false,
    data: '',
    currentLiked: false
  },
  action
) {
  switch (action.type) {
    case 'OPEN_PUBLIC_MODAL': {
      return {
        ...state,
        publicModalVisible: true,
        data: action.payload.data
      };
    }
    case 'DISMISS_PUBLIC_MODAL': {
      return {
        ...state,
        publicModalVisible: false
      };
    }
    case 'SET_CURRENT_LIKED': {
      return {
        ...state,
        currentLiked: action.payload
      };
    }
    default:
      return state;
  }
}
