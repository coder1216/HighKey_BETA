export default function reducer(state={
	user: {
		name: '',
	},
	token: '',
	logging: false,
	logged: false,
}, action) {
	switch (action.type) {
		case "USER_LOGIN": {
			return {...state, logging:true}
		}
		case "USER_LOGIN_REJECTED": {
			return {...state, logging:false, error: action.payload}
		}
		case "USER_LOGIN_FULFILLED": {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				logging:false,
				logged: true,
			}
		}
		case "USER_PROFILE": {
			return {...state, currentId:action.payload}
		}
		case "SET_CURRENT_USER": {
			return {...state, currentUser:action.payload}
		}
		case "USER_LOC": {
			return {...state, coords:action.payload}
		}
		case "USER_DESTROY_LOC": {
			return {...state, coords:action.payload}
		}
		case "USER_SAVE_POSITION": {
			return {...state, lastCoords:action.payload}
		}
		case "SET_MY_CURRENT_STATUS": {
			return {...state, myCurrentStatus:action.payload}
		}
		default:
     		return state
	}	
}