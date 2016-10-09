import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import EventSelector from './containers/EventSelector';
import ScoutingForm from './containers/ScoutingForm'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={EventSelector} />
		<Route path="events/:event" component={ScoutingForm} />
	</Route>
);
