import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOneCampaign } from "../../store/campaigns";
import { supportReward, singleReward, getOneRewards } from "../../store/rewards";
import { useModal } from "../../context/Modal";

const SupportForm = ({ rewardId, campaignId, userId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const rewards = useSelector((state) => state?.rewards)

    useEffect(() => {
        dispatch(getOneRewards(campaignId));
    }, [dispatch, campaignId]);

    const rewardsArr = Object.values(rewards)


    const handleSupport = () => {
        for (let idx in rewardsArr) {
            let reward = rewardsArr[idx].supports_full
            for (let n in reward) {
                if (userId == reward[n].user_id) {
                    closeModal()
                    return alert("User already supporting a different reward tier of this campaign")
                }
            }
        }
        const supportedReward = dispatch(supportReward(rewardId))
        if (supportedReward) {
            closeModal()
            dispatch(getOneRewards(campaignId));
            dispatch(getOneCampaign(campaignId));
            dispatch(getOneRewards(campaignId));
            dispatch(getOneCampaign(campaignId));
            // history.push(`/campaigns/${campaignId}`)
        }
    }

    return (
        <div className="delete-form-container">
            <div className="delete-welcome-text">
                <h1>Support</h1>
            </div>
            <div className="login-form-form">
                <h1>Support Campaign?</h1>
                <button className="delete-form-buttons" onClick={() => handleSupport()}>YES (Support Campaign)</button>
                <button className="delete-form-buttons" onClick={() => closeModal()}>NO (Don't Support)</button>
            </div>
        </div>
    )
}

export default SupportForm;
