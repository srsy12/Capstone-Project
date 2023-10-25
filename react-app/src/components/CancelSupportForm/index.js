import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOneCampaign } from "../../store/campaigns";
import { deleteSupport, singleReward, getOneRewards } from "../../store/rewards";
import { useModal } from "../../context/Modal";

const CancelSupportForm = ({ rewardId, campaignId, userId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const reward = useSelector((state) => state?.rewards[rewardId])


    useEffect(() => {
        dispatch(singleReward(rewardId));
    }, [dispatch, rewardId]);

    let supportsArr = reward?.supports_full
    let support;
    for (let el in supportsArr) {
        if (userId == supportsArr[el].user_id) {
            support = supportsArr[el]
        }
    }
    console.log(support)

    const handleSupport = () => {
        const deleted = dispatch(deleteSupport(support?.id))
        if (deleted) {
            dispatch(getOneRewards(campaignId));
            dispatch(getOneCampaign(campaignId));
            dispatch(getOneRewards(campaignId));
            dispatch(getOneCampaign(campaignId));
            closeModal()
            // history.push(`/campaigns/${campaignId}`)
        }
    }

    return (
        <div className="delete-form-container">
            <div className="delete-welcome-text">
                <h1>Cancel</h1>
            </div>
            <div className="login-form-form">
                <h1>Cancel Support?</h1>
                <button className="delete-form-buttons" onClick={() => handleSupport()}>YES (Cancel Support)</button>
                <button className="delete-form-buttons" onClick={() => closeModal()}>NO (Keep Supporting)</button>
            </div>
        </div>
    )
}

export default CancelSupportForm;
