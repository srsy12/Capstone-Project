import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const [query, setQuery] = useState(0)

	const handleReset = () => {
		Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(query)
		history.push(`/campaigns/search/${query}`)
		setQuery(0)
		handleReset()
	}

	return (
		<div className='nav-bar'>
			<div className='home-button'>
				<NavLink className="campaign-tile-link" exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div className='right-side-nav'>
					<form className='search-bar' onSubmit={handleSubmit}>
						<input
							className='search-input'
							type='string'
							onChange={e => setQuery(e.target.value)}
							placeholder='Search'
						/>
						<button type="submit" class="search-submit-button">
							<i class='fa fa-search'></i>
						</button>
					</form>
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
