export default function reducer(state={
	 region: {
        latitude: 60.192059, 
        longitude: 24.945831,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      },
    locs: [],
    currentUserProfileLocs: [
        {
          displayurl: '',
          location: {
            latitude: 0,
            longitude: 0
          }
        }
    ],
    loc: {
          id: null,
          displayurl: '',
          location: {
             latitude: 0,
             longitude: 0
          },
    },
    lastCoords: {},
    locModalOpen: false
}, action) {
	switch (action.type) {
		case "INITIAL_REGION": {
			return {...state, region:action.payload}
		}
    case "SET_REGION": {
      return {...state, region:action.payload}
    }
		case "SET_LOCATIONS": {
			return {...state, locs:action.payload}
		}
    case "DESTROY_LOCATIONS": {
      return {...state, locs:action.payload}
    }
    case "OPEN_LOC_MODAL": {
      return {
        ...state,
        loc: action.payload,
        locModalOpen: true
      }
    }
    case "DISMISS_LOC_MODAL": {
      return {
        ...state,
        loc: {
          id: null,
          displayurl: '',
          location: {
             latitude: 0,
             longitude: 0
          },
        },
        locModalOpen: false
      }
    }
    case "SET_CURRENT_USER_PROFILE_LOCS": {
      return {
        ...state,
        currentUserProfileLocs: action.payload,
      }
    }
    case "SET_LAST_KNOWN_LOCATION": {
      return {
        ...state,
        lastCoords: action.payload,
      }
    }
		default:
     		return state
	}	
}
