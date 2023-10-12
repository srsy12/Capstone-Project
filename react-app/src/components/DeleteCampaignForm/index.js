import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCampaign, getOneCampaign } from "../../store/campaigns";
import { useModal } from "../../context/Modal";


const DeleteForm = ({ campaignId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()

    const handleDelete = () => {
        const deletedCampaign = dispatch(deleteCampaign(campaignId))
        if (deletedCampaign) {
            dispatch(getOneCampaign(campaignId))
            closeModal()
            history.push('/')
        }
    }

    return (
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to delete this campaign?</p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Campaign)</button>
                <button className="no-button1" onClick={() => closeModal()}>NO (Keep Campaign)</button>
            </div>
        </div>
    )
}

export default DeleteForm;
