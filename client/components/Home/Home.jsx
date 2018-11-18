import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PrevRecord from '../Patient/PrevRecord';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			search: '',
			suggestions: [],
			results: null,
			selectedPatient: null,
			selectedResult: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.selectSuggestion = this.selectSuggestion.bind(this);
		this.selectResult = this.selectResult.bind(this);
	}

	async handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});

		if (e.target.name === 'search') {
			const res = await axios.get('/api/search/patients', {
				params: {
					name: e.target.value
				}
			});
			if (res && res.data && Array.isArray(res.data) && res.data.length) {
				this.setState({
					suggestions: res.data
				});
			}
		}
	}

	selectResult(result) {
		this.setState({
			selectedResult: result
		});
	}

	async selectSuggestion(patient) {
		this.setState({
			search: `${patient.first_name} ${patient.last_name}`,
			selectedPatient: patient,
			suggestions: []
		});

		try {
			const res = await axios.get('/api/report', {
				params: {
					patientId: patient.id
				}
			});
			this.setState({
				results: res.data
			});
		} catch (e) {
			console.log('failed...');
		}
	}

	render() {
		let result = null;

		if (this.state.results && this.state.selectedPatient) {
			let selectedResult = (
				<div className="home__results__none">
					<span>Please select a record</span>
				</div>
			);
			if (this.state.selectedResult) {
				selectedResult = <PrevRecord {...this.state.selectedResult} />;
			}

			result = (
				<div className="home__results">
					<div className="home__results__main">
						<h2>
							{this.state.selectedPatient.first_name} {this.state.selectedPatient.last_name}
						</h2>
						{selectedResult}
					</div>
					<div className="home__results__side">
						{this.state.results.map((result) => (
							<button key={result.id} onClick={() => this.selectResult(result)}>
								{moment(result.created_at).format('LL')}
							</button>
						))}
					</div>
				</div>
			);
		}

		return (
			<div className="home">
				<div className="home__center">
					<div className="home__center__search">
						<input
							placeholder="Search for a patient"
							type="text"
							onChange={this.handleChange}
							name="search"
							autoComplete="off"
							value={this.state.search}
						/>
						{this.state.suggestions.length ? (
							<div className="home__center__search__suggestions">
								{this.state.suggestions.map((sug) => (
									<button key={sug.id} onClick={() => this.selectSuggestion(sug)}>
										{sug.first_name} {sug.last_name}
									</button>
								))}
							</div>
						) : null}
					</div>
					{result}
				</div>
			</div>
		);
	}
}
