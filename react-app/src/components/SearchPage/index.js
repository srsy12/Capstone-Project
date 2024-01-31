import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchCampaigns } from "../../store/campaigns";
import "./SearchPage.css"


function SearchPage() {
    const dispatch = useDispatch()
    const campaignsObject = useSelector((state) => state?.campaigns)
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

    if (campaigns.length == 0) {
        header = <div className="search-header2">No results found</div>
    } else if (campaigns.length && query == 0) {
        header = <div className="search-header2">Showing All Campaigns</div>
    } else if (campaigns.length) {
        header = <div className="search-header">Showing results for "{query}"</div>
    }

    return (
        <div className="home-page-content">
            <div className="search-results-page">
                {header}
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
                                    <img src={campaign?.image_url[0].url} />
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
