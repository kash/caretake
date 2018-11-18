import React from 'react';
import moment from 'moment';

export default class PrevRecord extends React.Component {
	render() {
		return (
			<div className="prev-record">
				<div className="prev-record__row">
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-calendar" />
							Date
						</div>
						<span>{moment(this.props.created_at).format('LL')}</span>
					</div>
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-user-injured" />
							Pain Tolernace
						</div>
						<div className="prev-record__row__bar">
							<div
								className="prev-record__row__bar--fill"
								style={{
									width: `${(parseInt(this.props.pain_tolerance || 0) / 10) * 100}%`
								}}
							/>
						</div>
					</div>
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-heart-rate" />
							Symptoms
						</div>
						<p>{this.props.symptoms}</p>
					</div>
				</div>
				<div className="prev-record__row">
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-turkey" />
							Diet
						</div>
						<p>{this.props.diet}</p>
					</div>
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-tired" />
							Fatigue
						</div>
						<div className="prev-record__row__bar">
							<div
								className="prev-record__row__bar--fill"
								style={{
									width: `${(parseInt(this.props.fatigue || 0) / 10) * 100}%`
								}}
							/>
						</div>
					</div>
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-stomach" />
							Bowel Movement
						</div>
						<p>{this.props.bowel_movement}</p>
					</div>
				</div>
				<div className="prev-record__row">
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-running" />
							Exercise
						</div>
						<p>{this.props.exercise}</p>
					</div>
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-pills" />
							Medication Taken
						</div>
						<p>{parseInt(this.props.medication) ? 'Yes' : 'No'}</p>
					</div>
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-head-side" />
							Nausea
						</div>
						<div className="prev-record__row__bar">
							<div
								className="prev-record__row__bar--fill"
								style={{
									width: `${(parseInt(this.props.nausea || 0) / 10) * 100}%`
								}}
							/>
						</div>
					</div>
				</div>
				<div className="prev-record__row">
					<div className="prev-record__row__item">
						<div className="prev-record__row__icon">
							<i className="fas fa-cookie-bite" />
							Taste Change
						</div>
						<div className="prev-record__row__bar">
							<div
								className="prev-record__row__bar--fill"
								style={{
									width: `${(parseInt(this.props.taste_change || 0) / 10) * 100}%`
								}}
							/>
						</div>
					</div>
					<div className="prev-record__row__item" />
					<div className="prev-record__row__item" />
				</div>
			</div>
		);
	}
}
