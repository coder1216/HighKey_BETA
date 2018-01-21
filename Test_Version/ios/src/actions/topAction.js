import axios from 'axios';
const API_URL = 'http://myy.haaga-helia.fi/~jusju/allrounders/tophel.json';

export function fetchTop() {
        
            return function(dispatch) {
			    axios.get(`${API_URL}`)
			    .then(response => {
			      dispatch({
			        type: 'FETCH_TOP',
			        payload: response.data
			      });
			    })
			    .catch((error) => {
			      console.log(error);
			    })
			 }
}