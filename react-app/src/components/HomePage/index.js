import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllCampaigns } from "../../store/campaigns";
import { useLocation, useHistory } from 'react-router-dom'
import OpenModalButton2 from "../OpenModalButton/loginsignupbuttons";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const history = useHistory();
    const campaignsObject = useSelector((state) => state.campaigns)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getAllCampaigns());
    }, [dispatch, pathname]);

    const campaigns = Object.values(campaignsObject)

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let campaign = campaigns[getRandomInt(campaigns.length)]
    return (
        <div className="home-page-content">
            <div className="fetch-home">
                <div className="fetch-name-home">
                    Welcome to Fetch.
                </div>
            </div>
            <div className="campaign-explorer-home">
                <div className="about-us">
                    <div className="mission-goal">
                        This is Fetch, a website where users can both fund projects that catch their eye, as well as create their own passion projects in hopes of making their dreams a reality.
                    </div>
                    <div className="home-intro">
                        <div className="our-mission">
                            <div>OUR</div>
                            <div>MISSION:</div>
                        </div>
                        <div className="mission-desc">
                            Our mission is to help people fund their ideas when they may not otherwise have the fiscal means to do so. Supporters of said projects receive rewards and benefits according to the level of their support, resulting in a win-win situation for everyone involved!
                        </div>
                    </div>
                </div>
                <div className="get-started-home">
                    <div className="started-tiles">
                        Getting Started is as Simple as:
                    </div>
                    <div className="started-tiles">
                        <div className="tiles-number">1.</div>
                        <div>Making an Account</div>
                        {!sessionUser && (
                            <div className="home-buttons-cont">
                                <OpenModalButton2
                                    buttonText="Log In"
                                    modalComponent={<LoginFormModal />}
                                />

                                <OpenModalButton2
                                    buttonText="Sign Up"
                                    modalComponent={<SignupFormModal />}
                                />
                            </div>
                        )}
                    </div>
                    <div className="started-tiles">
                        <div className="tiles-number">2.</div>
                        <div>Creating your Campaign</div>
                        {sessionUser && (
                            <button className='create-campaign-butt2' onClick={() => history.push(`/campaigns/new`)}>Create a Campaign</button>
                        )}
                    </div>
                    <div className="started-tiles tiles2">
                        <div className="tiles-number">3.</div>
                        <div>Creating Reward Tiers for Your Campaign</div>
                    </div>
                </div>
                <div className="search-results-page">
                    <h1>Featured Campaign</h1>
                    <div>or search all campaigns <a className="search-all-butt" href={`/campaigns/search/0`}>here</a></div>
                    <div className="search-container">
                        <a className="campaign-tile-link" href={`/campaigns/${campaign?.id}`}>
                            <div className="single-campaign-tile">
                                <div className="tile-info">
                                    <div className="tile-name">
                                        {campaign?.name}
                                    </div>
                                    <div className="tile-tagline">
                                        {campaign?.tagline}
                                    </div>
                                    <div id="learn-more-text">
                                        Learn More
                                        <img height="15" width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjklEQVR4nO3asQ3CQBAF0WliLdN/JyRImAgCygEhXUSO9HeZ18HXOPDpDiT9yhm4ARvNXYEX8Og+poD7GvMETjRWjglVlglVlglVlgllmVSWSWWZVJZJNarMto7LnzEHjY0YUl+f1k5DjkhhiRSWSGGJFJZIYYkUlkhR/oqHqAklWMfSEdfTlykPBqR/8Abo/nQfGMTYTAAAAABJRU5ErkJggg==" />
                                    </div>
                                </div>
                                <div id="campaign-picture-preview2">
                                    <img src={campaign?.image_url} />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
