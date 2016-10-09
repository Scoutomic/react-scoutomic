import initTBA from 'thebluealliance';
import Promise from 'promise';
import Fuse from 'fuse.js';

const tba = new initTBA('scoutomic', 'scouting application', '1.0.0');

const year = (new Date()).getFullYear();

const longCompLevel = {
	'qm': 'Qualifiers',
	'qf': 'Quarterfinals',
	'sf': 'Semifinals',
	'f': 'Finals'
};

const orderCompLevel = {
	'qm': 1,
	'qf': 2,
	'sf': 3,
	'f': 4
};

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_MATCHES = 'FETCH_MATCHES';
export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const RESET_SEARCH = 'RESET_SEARCH';

export function fetchEvents() {
	const request = new Promise((resolve, reject) => {
		tba.getEventList(year, (err, res) => {
			if (err) reject(err);
			else {
				const events = res.map((event) => {
					event.name = event.name.split(' - ')[1] || event.name;
					event.name = event.name.split('sponsored')[0] || event.name;
					event.name = event.name.split('presented')[0] || event.name;

					if (event.name.length > 44) {
						event.name = event.name.substr(0, 44).trim() + '...';
					}

					return event;
				});

				resolve(events);
			}
		});
	});

	return {
		type: FETCH_EVENTS,
		payload: request
	};
}

export function fetchMatches(code) {
	const request = new Promise((resolve, reject) => {
		tba.getEventMatches(code.replace(year, ''), (err, res) => {
			if (err) reject(err);
			else {
				const matches = res.map((match) => {
					// Remove unused properties
					delete match.event_key;
					delete match.score_breakdown;
					delete match.time_string;
					delete match.videos;

					const compLevel = longCompLevel[match.comp_level];
					const setNumber = (match.comp_level === 'qm' || match.comp_level === 'f') ? '' : match.set_number;
					const matchNumber = match.match_number;

					match.name = `${compLevel} ${setNumber} Match ${matchNumber}`;

					match.order = (orderCompLevel[match.comp_level] * 10000) +
									(match.set_number * 1000) +
									(match.match_number);

					return match;
				});

				matches.sort((a, b) => {
					if (a.order < b.order)
						return -1;
					if (a.order > b.order)
						return 1;
					return 0;
				});

				resolve(matches);
			}
		});
	});

	return {
		type: FETCH_MATCHES,
		payload: request
	};
}

export function searchEvents(events, term) {
	const fuse = new Fuse(events, {
		keys: ['event_code', 'location', 'name']
	});

	const results = fuse.search(term);

	return {
		type: SEARCH_EVENTS,
		payload: results
	};
}

export function resetSearch() {
	return {
		type: RESET_SEARCH
	};
}

export function submitScoutingForm() {

}
