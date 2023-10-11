import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCampaigns } from "../../store/campaigns";
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const campaignsObject = useSelector((state) => state.campaigns)

    useEffect(() => {
        dispatch(getAllCampaigns());
    }, [dispatch]);

    const campaigns = Object.values(campaignsObject)
    console.log(campaigns)

    return (
        <div className="home-page-content">
            <div className="fetch-name-home">
                Fetch
            </div>
            <div className="campaign-explorer-home">
                <div className="get-started-home">
                    <div>
                        Getting Started is as Simple as
                    </div>
                    <div>
                        <div>
                            1. Making an Account
                        </div>
                        <div>
                            2. Creating your Project
                        </div>
                        <div>
                            3. Creating Reward Tiers
                        </div>
                    </div>
                </div>
                <div className="campaign-tiles">
                    <div>Featured Campaigns</div>
                    {campaigns?.map((campaign) => (
                        <a className="campaign-tile-link" href={`/campaigns/${campaign?.id}`}>
                            <div className="one-campaign-tile">
                                <div>
                                    {campaign?.name}
                                </div>
                                <div>
                                    {campaign?.tagline}
                                </div>
                                <div id="campaign-picture-preview">
                                    <img src={campaign?.image_url} />
                                </div>
                                <div id="learn-more-text">
                                    Learn More
                                    <img height="15" width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjklEQVR4nO3asQ3CQBAF0WliLdN/JyRImAgCygEhXUSO9HeZ18HXOPDpDiT9yhm4ARvNXYEX8Og+poD7GvMETjRWjglVlglVlglVlgllmVSWSWWZVJZJNarMto7LnzEHjY0YUl+f1k5DjkhhiRSWSGGJFJZIYYkUlkhR/oqHqAklWMfSEdfTlykPBqR/8Abo/nQfGMTYTAAAAABJRU5ErkJggg==" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
