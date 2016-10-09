import { FETCH_EVENTS, SEARCH_EVENTS, RESET_SEARCH } from '../actions';

const INITIAL_STATE = { all: [], search: [] };

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_EVENTS:
			return { all: action.payload, search: action.payload };
		case SEARCH_EVENTS:
			return { ...state, search: action.payload }
		case RESET_SEARCH:
			return { ...search, search: state.all }
	}

	return state;
}
