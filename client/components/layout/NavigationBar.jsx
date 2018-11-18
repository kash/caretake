import React from 'react';
import {Link} from 'react-router';

export default class NavigationBar extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<nav>
				<div className="nav-content">
					<div>
						<Link to={'/'}>
							<img src="/public/images/logo_hand_blue.svg" alt="Caretake Logo" />
						</Link>
					</div>
					<div className="nav-ul-wrapper">
						<ul className="nav-ul">
							<li>
								<Link to={'/'}>Doctor</Link>
							</li>
							<li>
								<Link to={'/patient'}>Patient</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
