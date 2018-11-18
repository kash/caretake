import React from 'react';
import axios from 'axios';
import PrevRecord from './PrevRecord';

export default class PatientView extends React.Component {
	call = ['fever', 'chest pain', 'confusion'];

	constructor() {
		super();

		this.state = {
			prevRecords: [],
			creatingNew: false,
			newRecord: {},
			showPopup: false
		};

		this.toggleCreate = this.toggleCreate.bind(this);
		this.updateNewRecord = this.updateNewRecord.bind(this);
		this.submitRecord = this.submitRecord.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	async submitRecord() {
		for (let i of this.call) {
			if (this.state.newRecord.symptoms.indexOf(i) != -1) {
				this.setState({
					showPopup: true
				});
				break;
			}
		}

		await axios.put('/api/record', {
			...this.state.newRecord,
			patient_id: '54321',
			doctor_id: '12345'
		});

		const res = await axios.get('/api/report', {
			params: {
				patientId: 54321
			}
		});

		this.setState({
			prevRecords: res.data,
			creatingNew: false,
			newRecord: {}
		});
	}

	toggleCreate() {
		this.setState(
			{
				creatingNew: !this.state.creatingNew
			},
			() => {
				if (!this.state.creatingNew) {
					this.setState({
						newRecord: {}
					});
				}
			}
		);
	}

	updateNewRecord(e) {
		this.setState({
			newRecord: {
				...this.state.newRecord,
				[e.target.name]: e.target.value
			}
		});
	}

	async componentDidMount() {
		const res = await axios.get('/api/report', {
			params: {
				patientId: '54321'
			}
		});
		this.setState({
			prevRecords: res.data
		});
	}

	render() {
		let prevRecords = (
			<div className="patient-view__empty-prev">
				<span>No previous records found</span>
			</div>
		);
		if (this.state.prevRecords.length) {
			prevRecords = this.state.prevRecords.map((prev) => <PrevRecord key={prev.id} {...prev} />);
		}

		let createNew = null;
		if (this.state.creatingNew) {
			createNew = (
				<div className="patient-view__new">
					<div className="patient-view__new__row">
						<div className="patient-view__new__row--item">
							<legend>Pain Level</legend>
							<select
								onChange={this.updateNewRecord}
								value={this.state.newRecord.pain_tolerance}
								name="pain_tolerance"
							>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
							</select>
						</div>
						<div className="patient-view__new__row--item">
							<legend>Symptoms</legend>
							<textarea name="symptoms" onChange={this.updateNewRecord} />
						</div>
						<div className="patient-view__new__row--item">
							<legend>Diet</legend>
							<textarea name="diet" onChange={this.updateNewRecord} />
						</div>
					</div>
					<div className="patient-view__new__row">
						<div className="patient-view__new__row--item">
							<legend>Fatigue</legend>
							<select value={this.state.newRecord.fatigue} name="fatigue" onChange={this.updateNewRecord}>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
							</select>
						</div>
						<div className="patient-view__new__row--item">
							<legend>Bowel Movement</legend>
							<textarea name="bowel_movement" onChange={this.updateNewRecord} />
						</div>
						<div className="patient-view__new__row--item">
							<legend>Exercise</legend>
							<textarea name="exercise" onChange={this.updateNewRecord} />
						</div>
					</div>
					<div className="patient-view__new__row">
						<div className="patient-view__new__row--item">
							<legend>Medication Taken</legend>
							<select
								value={this.state.newRecord.medication}
								name="medication"
								onChange={this.updateNewRecord}
							>
								<option value={0}>No</option>
								<option value={1}>Yes</option>
							</select>
						</div>
						<div className="patient-view__new__row--item">
							<legend>Nausea</legend>
							<select value={this.state.newRecord.nausea} name="nausea" onChange={this.updateNewRecord}>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
							</select>
						</div>
						<div className="patient-view__new__row--item">
							<legend>Taste Change</legend>
							<select
								value={this.state.newRecord.taste_change}
								name="taste_change"
								onChange={this.updateNewRecord}
							>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
							</select>
						</div>
					</div>
					<div className="patient-view__new__row patient-view__new--submit">
						<button className="shared-button" onClick={this.submitRecord}>
							Submit
						</button>
						<button className="shared-button" onClick={this.toggleCreate}>
							Cancel
						</button>
					</div>
				</div>
			);
		}

		let popup = null;
		if (this.state.showPopup) {
			popup = (
				<div className="patient-view__popup">
					<div className="patient-view__popup__center">
						<p>
							We see that at least one of your symptoms is a cause for concern. We recommend that you
							immedietly speak to one of our Patient Care Representatives to schedule an appointment.
							Would you like one of our Patient Care Representatives to give you a call?
						</p>
						<button onClick={this.togglePopup}>Yes, call me now</button>
						<button onClick={this.togglePopup}>No</button>
					</div>
				</div>
			);
		}

		return (
			<div className="patient-view">
				{this.state.creatingNew ? null : (
					<div className="patient-view__new-button">
						<button onClick={this.toggleCreate}>
							<i className="far fa-plus" />
						</button>
					</div>
				)}
				{popup}
				{createNew}
				{prevRecords}
			</div>
		);
	}
}
