import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Edit from './components/Edit.jsx';

export default function App (){
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/edit/:id'>
						<Edit />
					</Route>
					<Route path='/home'>
						<Home />
					</Route>
					<Route path='/'>
						<Login />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
