import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { fetchMatches, submitScoutingForm } from '../actions';

class ScoutingForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = { open: true };

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onMatchClick = this.onMatchClick.bind(this);
	}

	componentWillMount() {
		this.props.fetchMatches(this.props.params.event);
	}

	onSearchChange(e) {
		console.log(e);
	}

	onMatchClick(e) {
		this.setState({ open: false });
	}

	renderMatches() {
		if (this.props.matches.length === 0) {
		// if (true) {
			return (
				<div className="match-loading">
					Loading matches...
				</div>
			);
		}

		return this.props.matches.map((match) => {
			return (
				<MenuItem
					onClick={this.onMatchClick}
					key={match.key}
					className="match-" >
					{match.name}
				</MenuItem>
			)
		})
	}

	render() {
		return (
			<div>
				<Drawer
					width={300}
					open={this.state.open} >
					<div className="match-search">
						<TextField
							onChange={this.onSearchChange}
							className="match-search-input"
							id="search"
							floatingLabelText="Search" />
					</div>

					{this.renderMatches()}
				</Drawer>

				<div className="scouting-container">
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		matches: state.matches
	};
}

export default connect(mapStateToProps, { fetchMatches })(ScoutingForm);
