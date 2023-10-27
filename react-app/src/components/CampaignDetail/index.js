import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { getOneCampaign } from "../../store/campaigns";
import { getOneRewards } from "../../store/rewards";
import DeleteForm from "../DeleteCampaignForm";
import DeleteRewardForm from "../DeleteRewardForm";
import SupportForm from "../SupportFormModal";
import CancelSupportForm from "../CancelSupportForm";
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


    const sortedValues = rewardsArr.toSorted((a, b) => a.price - b.price)

    function tooManyRewards() {
        if (sortedValues.length >= 4) {
            return alert("You cannot have more than 4 reward tiers per campaign")
        } else {
            history.push(`/campaigns/${campaignId}/rewards/new`)
        }
    }

    function setActiveClass(e) {
        e.preventDefault()
        e.target.parentNode.classList.toggle('less')
    }

    return (
        <div className="home-page-content">
            <div id="details-img-container">
                <img src={campaign?.image_url} />
            </div>
            <div id="details-content">
                <div id="details-header-info">
                    <div id="details-nametag">
                        <div id="details-name">{campaign?.name}</div>
                        <div id="details-tagline">{campaign?.tagline}</div>
                        <div>{campaign?.state}, {campaign?.country}</div>
                        <div>{campaign?.owner.username}</div>
                        <div id="details-funds">${campaign?.current_funds} / ${campaign?.goal}</div>
                        {sessionUser?.id == campaign?.owner_id && (
                            <div className="rewards-butt-container">
                                <button className=" btn btn1" onClick={() => history.push(`/campaigns/update/${campaignId}`)}>Update Campaign</button>
                                <OpenModalButton
                                    buttonText="Delete Campaign"
                                    modalComponent={<DeleteForm campaignId={campaignId} />}
                                />
                                <button className="btn btn1" onClick={() => tooManyRewards()}>Add a Reward Tier</button>
                            </div>
                        )}
                    </div>
                    <div id="details-description">
                        {campaign?.description}
                    </div>
                </div>
                {sortedValues?.length > 0 && (
                    <div className="rewards-container">
                        {sortedValues?.map((reward) => (
                            <div className="reward-cards">
                                <div className="rewards-name">{reward.name}</div>
                                <div className="rewards-price">${reward.price}</div>
                                {sessionUser?.id == campaign?.owner_id && (
                                    <div className="rewards-butt-container">
                                        <button className="btn btn1" onClick={() => history.push(`/rewards/update/${reward.id}`)}>Update Reward Tier</button>
                                        <OpenModalButton
                                            buttonText="Delete Reward Tier"
                                            modalComponent={<DeleteRewardForm rewardId={reward.id} campaignId={campaignId} userId={sessionUser?.id} />}
                                        />
                                    </div>
                                )}
                                {sessionUser?.id != campaign?.owner_id && !reward?.supports.includes(sessionUser?.id) && sessionUser?.id && (
                                    <div className="rewards-butt-container">
                                        <OpenModalButton
                                            buttonText="Support"
                                            modalComponent={<SupportForm rewardId={reward.id} campaignId={campaignId} userId={sessionUser?.id} />}
                                        />
                                    </div>
                                )}
                                {sessionUser?.id != campaign?.owner_id && reward?.supports.includes(sessionUser?.id) && sessionUser?.id && (
                                    <div className="rewards-butt-container">
                                        <OpenModalButton
                                            buttonText="Cancel Support"
                                            modalComponent={<CancelSupportForm rewardId={reward.id} campaignId={campaignId} userId={sessionUser?.id} />}
                                        />
                                    </div>
                                )}
                                <div className="rewards-description">{reward.description}</div>
                                <a className="more" onClick={setActiveClass}></a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CampaignDetailPage;
