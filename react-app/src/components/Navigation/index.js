import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { getAllOfCampaigns } from "../../store/allCampaigns";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state?.session.user);
	const campaignsObject = useSelector((state) => state?.allCampaigns)
	const history = useHistory()
	const [query, setQuery] = useState(0)

	useEffect(() => {
		dispatch(getAllOfCampaigns());
	}, [dispatch]);

	const handleReset = () => {
		Array.from(document.querySelectorAll("select")).forEach(
			(select) => (select.value = "0")
		);
		Array.from(document.querySelectorAll("input")).forEach(
			(input) => (input.value = "")
		);
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!query) {
			history.push(`/campaigns/search/${0}`)
		} else {
			history.push(`/campaigns/search/${query}`)
		}
		setQuery(0)
		handleReset()
	}

	const campaignsArr = Object.values(campaignsObject)

	return (
		<div className='nav-bar'>
			<div className='home-button'>
				<NavLink className="campaign-tile-link" exact to="/">Home</NavLink>
			</div>
			{isLoaded && (
				<div className='right-side-nav'>
					<form className='search-bar' onSubmit={handleSubmit}>
						{/* <input
							className='search-input'
							type='string'
							onChange={e => setQuery(e.target.value)}
							placeholder='Search'
						/> */}
						<Autocomplete
							id="combo-box-demo"
							options={campaignsArr}
							getOptionLabel={(campaign) =>
								campaign.name
							}
							renderOption={(props, campaign) => (
								<li {...props}>
									<div className="search-results-container">
										<div>
											<img
												id="search-img-results"
												src={
													campaign.image_url &&
														campaign.image_url
															.length > 0
														? campaign.image_url
														: "default-image-url.jpg"
												}
												alt={campaign.name}
											/>
										</div>
										<div className="search-results-info">
											<div id="search-results-name">
												{campaign.name}
											</div>
										</div>
									</div>
								</li>
							)}
							onChange={(event, campaign) =>
								setQuery(
									campaign ? campaign.name : ""
								)
							}
							onSelect={(e) => setQuery(e.target.value)}
							renderInput={(params) => (
								<TextField
									className="query-box"
									size="small"
									variant="standard"
									{...params}
									placeholder="Search..."
								/>
							)}
						/>
						<button type="submit" className="search-submit-button">
							<ion-icon name="search-sharp"></ion-icon>
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
