import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div className='nav-bar'>
			<div className='home-button'>
				<NavLink className="campaign-tile-link" exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div className='right-side-nav'>
					{sessionUser && (
						<button className='create-campaign-butt' onClick={() => history.push(`/campaigns/new`)}>Create a Campaign</button>
					)}
					<div className='nav-profile-butt'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
