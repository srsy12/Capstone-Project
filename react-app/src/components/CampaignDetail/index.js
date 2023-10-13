import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { getOneCampaign } from "../../store/campaigns";
import { getOneRewards } from "../../store/rewards";
import DeleteForm from "../DeleteCampaignForm";
import DeleteRewardForm from "../DeleteRewardForm";
import OpenModalButton from "../OpenModalButton";
import "./CampaignDetail.css"

function CampaignDetailPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { campaignId } = useParams()
    const campaign = useSelector((state) => state?.campaigns[campaignId])
    const rewards = useSelector((state) => state?.rewards)
    const sessionUser = useSelector((state) => state?.session.user);

    useEffect(() => {
        dispatch(getOneCampaign(campaignId));
        dispatch(getOneRewards(campaignId))
    }, [dispatch, campaignId]);

    const rewardsArr = Object.values(rewards)

    return (
        <div className="home-page-content">
            {sessionUser?.id == campaign?.owner_id && (
                <div>
                    <button onClick={() => history.push(`/campaigns/update/${campaignId}`)}>Update Campaign</button>
                    <OpenModalButton
                        buttonText="Delete Campaign"
                        modalComponent={<DeleteForm campaignId={campaignId} />}
                    />
                </div>
            )}
            <div>{campaign?.name}</div>
            <div>{campaign?.tagline}</div>
            <img src={campaign?.image_url} />
            <div>{campaign?.state}, {campaign?.country}</div>
            <div>{campaign?.owner.username}</div>
            <div>${campaign?.current_funds} / ${campaign?.goal}</div>
            <div>{campaign?.description}</div>
            {sessionUser?.id == campaign?.owner_id && (
                <div>
                    <button onClick={() => history.push(`/campaigns/${campaignId}/rewards/new`)}>Add a Reward Tier</button>
                </div>
            )}
            {rewardsArr?.length > 0 && (
                <div>
                    {rewardsArr?.map((reward) => (
                        <div>
                            <div>{reward.name}</div>
                            <div>{reward.price}</div>
                            <div>{reward.description}</div>
                            {sessionUser?.id == campaign?.owner_id && (
                                <div>
                                    <button onClick={() => history.push(`/rewards/update/${reward.id}`)}>Update Reward Tier</button>
                                    <OpenModalButton
                                        buttonText="Delete Reward Tier"
                                        modalComponent={<DeleteRewardForm rewardId={reward.id} campaignId={campaignId} />}
                                    />
                                </div>
                            )}
                            {sessionUser?.id != campaign?.owner_id && (
                                <div>
                                    <button>Support</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CampaignDetailPage;
