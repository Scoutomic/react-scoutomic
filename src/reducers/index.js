import { combineReducers } from 'redux';

import EventsReducer from './events';
import MatchesReducer from './matches';

const rootReducer = combineReducers({
    events: EventsReducer,
    matches: MatchesReducer
});

export default rootReducer;
