import { FETCH_MATCHES } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_MATCHES:
			return action.payload
	}

	return state;
}
