import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { fetchEvents, searchEvents, resetSearch } from '../actions';

class EventSelector extends Component {
	constructor(props) {
		super(props);

		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	componentWillMount() {
		this.props.fetchEvents();
	}

	onSearchSubmit(e) {
		e.preventDefault();

		const value = document.getElementById('search').value;

		if (value) {
			this.props.searchEvents(this.props.events, value);
		} else {
			this.props.resetSearch();
		}
	}

	renderEventList() {
		if (this.props.search.length === 0) {
			return (
				<div className="loader">
					Loading events...
				</div>
			);
		}

		return this.props.search.map((event) => {
			const url = `/events/${event.key}`;

			return (
				<Card className="event-card" key={event.key}>
					<CardHeader
						className="event-header"
						title={event.name}
						subtitle={event.location} />
					<CardActions>
						<Link to={url}>
							<FlatButton label="Scout This Event" />
						</Link>
					</CardActions>
				</Card>
			);
		});
	}

	render() {
		return (
			<div className="events-container">
				<form className="event-search-form" onSubmit={this.onSearchSubmit}>
					<TextField
						className="event-search-input"
						id="search"
						floatingLabelText="Search" />
					<RaisedButton
						className="event-search-submit"
						type="submit"
						label="Submit"
						primary={true} />
				</form>

				{this.renderEventList()}
			</div>
		);
	}
}

export function mapStateToProps(state) {
	return {
		events: state.events.all,
		search: state.events.search
	};
}

export default connect(mapStateToProps, { fetchEvents, searchEvents, resetSearch })(EventSelector);
