import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReward, singleReward } from "../../store/rewards";
import { getOneCampaign } from "../../store/campaigns";
import { useModal } from "../../context/Modal";


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
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to delete this reward tier?</p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Reward)</button>
                <button className="no-button1" onClick={() => closeModal()}>NO (Keep Reward)</button>
            </div>
        </div>
    )
}

export default DeleteRewardForm;
