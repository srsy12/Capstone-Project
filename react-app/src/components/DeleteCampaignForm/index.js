import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCampaign, getOneCampaign } from "../../store/campaigns";
import { useModal } from "../../context/Modal";
import "./DeleteCampaignForm.css"

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
        <div className="delete-form-container">
            <div className="delete-welcome-text">
                <h1>Delete</h1>
            </div>
            <div className="login-form-form">
                <h1>Delete Campaign?</h1>
                <button className="delete-form-buttons" onClick={() => handleDelete()}>YES (Delete Campaign)</button>
                <button className="delete-form-buttons" onClick={() => closeModal()}>NO (Keep Campaign)</button>
            </div>
        </div>
    )
}

export default DeleteForm;
