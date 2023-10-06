import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }){

	return (
		<ul>
			<li>
				<NavLink exact to="/posts">Home</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;
