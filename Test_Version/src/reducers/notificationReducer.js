export default function reducer(state={
	notifications: [
		{
			id: 0,
			title: 'Default Title',
			body: 'Default body',
			date: 'Default date',
		},
		{
			id: 0,
			title: 'Default Title',
			body: 'Default body',
			date: 'Default date',
		},
		{
			id: 0,
			title: 'Default Title',
			body: 'Default body',
			date: 'Default date',
		},
	]
}, action) {
	switch (action.type) {
		case "NOTIFICATION_UPDATE": {
			return {
				...state,
				notification: action.payload
			}
		}
		default:
     		return state
	}	
}