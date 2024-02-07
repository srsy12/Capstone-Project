import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllCampaigns } from "../../store/campaigns";
import { authenticate } from "../../store/session";

function ProfilePage() {
    const dispatch = useDispatch()
    const campaignsObject = useSelector((state) => state.campaigns)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllCampaigns());
        dispatch(authenticate())
    }, [dispatch]);

    const campaigns = sessionUser?.campaigns
    const supports = sessionUser?.supports


    return (
        <div className="home-page-content">
            <div className="campaign-explorer-home">
                <div className="search-results-page">
                    <h1>{sessionUser?.username}'s campaigns</h1>
                    <div className="search-container">
                        {campaigns?.map((campaign) => (
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
                                        <img src={campaign?.image_url[0]?.url} />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    {supports.length > 0 && (
                        <>
                            <h1>{sessionUser?.username}'s supported campaigns</h1>
                            <div className="search-container">
                                {supports?.map((campaign) => (
                                    <a className="campaign-tile-link" href={`/campaigns/${campaign?.campaigns?.id}`}>
                                        <div className="single-campaign-tile">
                                            <div className="tile-info">
                                                <div className="tile-name">
                                                    {campaign?.campaigns?.name}
                                                </div>
                                                <div className="tile-tagline">
                                                    {campaign?.campaigns?.tagline}
                                                </div>
                                                <div id="learn-more-text">
                                                    Learn More
                                                    <img height="15" width="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjklEQVR4nO3asQ3CQBAF0WliLdN/JyRImAgCygEhXUSO9HeZ18HXOPDpDiT9yhm4ARvNXYEX8Og+poD7GvMETjRWjglVlglVlglVlgllmVSWSWWZVJZJNarMto7LnzEHjY0YUl+f1k5DjkhhiRSWSGGJFJZIYYkUlkhR/oqHqAklWMfSEdfTlykPBqR/8Abo/nQfGMTYTAAAAABJRU5ErkJggg==" />
                                                </div>
                                            </div>
                                            <div id="campaign-picture-preview2">
                                                <img src={campaign?.campaigns?.image_url[0]?.url} />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
