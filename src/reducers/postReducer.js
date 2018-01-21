export default function reducer(state={
	path: ''
}, action) {
	switch (action.type) {
		case "SET_PATH": {
			return {
				...state, 
				path: action.payload
			}
		}
		default:
     		return state
	}	
}