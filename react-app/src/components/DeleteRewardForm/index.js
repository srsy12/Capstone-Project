import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReward, singleReward } from "../../store/rewards";
import { getOneCampaign } from "../../store/campaigns";
import { useModal } from "../../context/Modal";
import "./DeleteRewardForm.css"


const DeleteRewardForm = ({ rewardId, campaignId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()

    const handleDelete = () => {
        const deletedReward = dispatch(deleteReward(rewardId))
        if (deletedReward) {
            closeModal()
            dispatch(getOneCampaign(campaignId))
            history.push(`/campaigns/${campaignId}`)
        }
    }

    return (
        <div className="delete-form-container">
            <div className="login-form-form2">
                <h1>Delete Reward?</h1>
                <button className="delete-form-buttons2" onClick={() => handleDelete()}>YES (Delete Reward)</button>
                <button className="delete-form-buttons2" onClick={() => closeModal()}>NO (Keep Reward)</button>
            </div>
            <div className="delete-welcome-text2">
                <h1>Delete</h1>
            </div>
        </div>
    )
}

export default DeleteRewardForm;
