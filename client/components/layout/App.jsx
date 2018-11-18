import React from 'react';
import NavigationBar from './NavigationBar';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		let route = this.props.route;
		let nav = route.hideNav ? null : <NavigationBar />;
		return (
			<div className={this.props.route.appClassName}>
				{nav}
				{this.props.children}
			</div>
		);
	}
}
