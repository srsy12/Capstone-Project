import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getOneCampaign } from "../../store/campaigns";
import "./CampaignDetail.css"

function CampaignDetailPage() {
    const dispatch = useDispatch()
    const { campaignId } = useParams()
    const campaign = useSelector((state) => state?.campaigns[campaignId])
    const sessionUser = useSelector((state) => state?.session.user);

    useEffect(() => {
        dispatch(getOneCampaign(campaignId));
    }, [dispatch, campaignId]);

    console.log(campaign)

    return (
        <div className="home-page-content">
            <div>{campaign?.name}</div>
            <div>{campaign?.tagline}</div>
            <img src={campaign?.image_url} />
            <div>{campaign?.state}, {campaign?.country}</div>
            <div>{campaign?.owner.username}</div>
            <div>${campaign?.current_funds} / ${campaign?.goal}</div>
            <div>{campaign?.description}</div>
            {campaign?.rewards?.length > 0 && (
                <div>
                    {campaign.rewards.map((reward) => (
                        <div>
                            <div>{reward.name}</div>
                            <div>{reward.price}</div>
                            <div>{reward.description}</div>
                            <button>Support</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CampaignDetailPage;