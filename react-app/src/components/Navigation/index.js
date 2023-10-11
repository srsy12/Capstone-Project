import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='nav-bar'>
			<div className='home-button'>
				<NavLink className="campaign-tile-link" exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div className='nav-profile-butt'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
