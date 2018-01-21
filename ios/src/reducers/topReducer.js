export default function reducer(state={
	top: {}
}, action) {
	switch (action.type) {
		case "FETCH_TOP": {
			return {...state, top:action.payload}
		}
		default:
     		return state
	}	
}