import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchCampaigns } from "../../store/campaigns";
import "./SearchPage.css"


function SearchPage() {
    const dispatch = useDispatch()
    const campaignsObject = useSelector((state) => state.campaigns)
    let { query } = useParams()

    useEffect(() => {
        if (query == 0) {
            query = parseInt(0)
        }
        dispatch(searchCampaigns(query));
    }, [dispatch, query]);

    const campaigns = Object.values(campaignsObject)
    console.log(campaigns)

    let header;

    if (query == 0) {
        header = <div>Showing All Campaigns</div>
    } else {
        header = <div>Showing results for "{query}"</div>
    }

    return (
        <div className="home-page-content">
            <div className="search-results-page">
                <div>
                    {header}
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

export default SearchPage;
