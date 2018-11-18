import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// LAYOUT
import App from './layout/App.jsx';

// HOME
import Home from './home/Home';

// PATIENT
import Patient from './Patient/PatientView';

import {Provider} from 'react-redux';
import reducers from '../reducers/reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(), thunk);
const store = createStore(reducers, middleware);
delete window.__PRELOADED_STATE__;

require('../styles/styles.scss');

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
			</Route>
			<Route path="/patient" component={App}>
				<IndexRoute component={Patient} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);
