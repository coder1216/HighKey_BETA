export function userLogin(data) {
        
            return {
				type: "USER_LOGIN_FULFILLED",
				payload: data
			}
}

export function userProfile(id) {
        
            return {
				type: "USER_PROFILE",
				payload: id
			}
}

export function setCurrentUser(user) {
        
            return {
				type: "SET_CURRENT_USER",
				payload: user
			}
}

export function userLocation(coords) {
        
            return {
				type: "USER_LOC",
				payload: coords
			}
}
export function destroyLocation() {
        
            return {
				type: "USER_LOC",
				payload: null
			}
}
export function savePosition(coords) {
        
            return {
				type: "USER_SAVE_POSITION",
				payload: coords
			}
}
export function initialRegion(region) {
        
            return {
				type: "INITIAL_REGION",
				payload: region
			}
}
export function setLocations(locs) {
        
            return {
				type: "SET_LOCATIONS",
				payload: locs
			}
}
export function destroyLocations() {
        
            return {
				type: "DESTROY_LOCATIONS",
				payload: []
			}
}
export function openLocModal(loc) {     
            return {
				type: "OPEN_LOC_MODAL",
				payload: loc
			}
}
export function dismissLocModal() {
            return {
				type: "DISMISS_LOC_MODAL",
			}
}
export function setCurrentUserProfileLocs(locs) {
            return {
				type: "SET_CURRENT_USER_PROFILE_LOCS",
				payload: locs
			}
}
export function openPublicModal(data) {
            return {
				type: "OPEN_PUBLIC_MODAL",
				payload: {
					modalVisible: true,
					data: data
				}
			}
}
export function dismissPublicModal() {
            return {
				type: "DISMISS_PUBLIC_MODAL",
				payload: false
			}
}
export function setCurrentLiked(status) {
            return {
				type: "SET_CURRENT_LIKED",
				payload: status
			}
}
export function setLastKnownLocation(lat, long) {
            return {
				type: "SET_LAST_KNOWN_LOCATION",
				payload: {
					latitude: lat,
					longitude: long
				}
			}
}
export function setRegion(region) {
            return {
				type: "SET_REGION",
				payload: region
			}
}
export function setMyCurrentStatus(status) {
            return {
				type: "SET_MY_CURRENT_STATUS",
				payload: status
			}
}

export function showChallenge() {
    return {
        type: "DISPLAY_CHALLENGE",

    }
}