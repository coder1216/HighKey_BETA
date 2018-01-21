export function setPath(path) {
  return {
    type: 'SET_PATH',
    payload: path
  };
}

export function setText(locText) {
  return {
    type: 'SET_TEXT',
    payload: locText
  };
}

export function selectSpot(spot) {
  return {
    type: 'SPOT_SELECTED',
    payload: spot
  };
}

export function carouselOpen() {
  return {
    type: 'CAROUSEL_OPEN',
    payload: true
  };
}

export function carouselClose() {
  return {
    type: 'CAROUSEL_CLOSED',
    payload: false
  };
}

//Media saving actions
export function saveMediaInformation() {
  return {
    type: 'MEDIA_SAVE_STARTED',
    payload: true
  };
}
export function saveMediaInformationSuccess() {
  return {
    type: 'MEDIA_SAVE_SUCCESS',
    payload: true
  };
}
export function saveMediaInformationFail(data) {
  return {
    type: 'MEDIA_SAVE_FAIL',
    payload: true
  };
}

//Fetching posts actions
export function fetchPosts() {
  return {
    type: 'FETCH_POSTS',
    payload: true
  };
}
export function fetchPostsSuccess(data) {
  return {
    type: 'FETCH_POSTS_SUCCESS',
    payload: data
  };
}
export function fetchPostsFail() {
  return {
    type: 'FETCH_POSTS_FAIL',
    payload: true
  };
}
export function pinnedSpotUpdate() {
  return {
    type: 'PINNED_SPOT_UPDATE',
    payload: true
  };
}
