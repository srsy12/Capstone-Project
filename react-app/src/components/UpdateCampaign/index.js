import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { updateCampaign, getOneCampaign } from "../../store/campaigns";
import { useLocation } from 'react-router-dom'
import "../CreateCampaign/CreateCampaign.css"

function UpdateCampaignForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { campaignId } = useParams()
    const campaign = useSelector((state) => state?.campaigns[campaignId])
    const { pathname } = useLocation();
    const [country, setCountry] = useState(campaign?.country);
    const [state, setState] = useState(campaign?.state);
    const [name, setName] = useState(campaign?.name);
    const [goal, setGoal] = useState(campaign?.goal);
    const [image_url, setImageUrl] = useState(campaign?.image_url);
    const [tagline, setTagline] = useState(campaign?.tagline);
    const [description, setDescription] = useState(campaign?.description)
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    useEffect(() => {
        dispatch(getOneCampaign(campaignId));
    }, [dispatch, campaignId]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value);
    const updateGoal = (e) => setGoal(e.target.value);
    const updateUrl = (e) => setImageUrl(e.target.value);
    const updateTagline = (e) => setTagline(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();


        const errors = {};
        if (!country) {
            errors.country = "Country is required";
        }
        if (!state) {
            errors.state = "State is required"
        }
        if (!name) {
            errors.name = "Name is required"
        }
        if (!goal) {
            errors.goal = "Goal is required"
        }
        if (!tagline) {
            errors.tagline = "Tagline is required"
        }
        if (!description) {
            errors.description = "Description is required"
        }
        if (!image_url) {
            errors.urls = "Image is required"
        } else {
            if (!image_url.match(/\.(png|jpe?g)$/)) {
                errors.urls = "Image url must end in a .png, .jpg, or .jpeg"
            }
        }
        setErrors(errors)

        if (Object.values(errors).length === 0) {
            setValidSubmit(true);

            const newCampaign = {
                image_url,
                state,
                country,
                name,
                tagline,
                description,
                goal,
            };

            try {
                const createdCampaign = await dispatch(updateCampaign(newCampaign, campaignId));
                if (createdCampaign) {
                    history.push(`/campaigns/${createdCampaign.id}`);
                }
            } catch (error) {
                console.error("Campaign creation failed:", error);

            }
            setValidSubmit(false)
        }
    }

    return (
        <div className="home-page-content">
            <div className="form-container">
                <form className="campaign-form-style" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h1>Update YOUR CAMPAIGN</h1>
                        <p>Change your project to match your current goals</p>
                    </div>
                    <div className="input-container">
                        <div className="form-group">
                            <label htmlFor="name">Name  {errors.name && <p className="error-message">* {errors.name}</p>}</label>
                            <input
                                type="string"
                                value={name}
                                onChange={updateName}
                                className={`input-field ${errors.name ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="goal">Price Goal {errors.goal && <p className="error-message">* {errors.goal}</p>}</label>
                            <input
                                type="number"
                                value={goal}
                                onChange={updateGoal}
                                className={`input-field ${errors.goal ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State {errors.state && <p className="error-message">* {errors.state}</p>}</label>
                            <input
                                type="string"
                                value={state}
                                onChange={updateState}
                                className={`input-field ${errors.state ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country {errors.country && <p className="error-message">* {errors.country}</p>}</label>
                            <input
                                type="string"
                                value={country}
                                onChange={updateCountry}
                                className={`input-field ${errors.country ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tagline">Tagline {errors.tagline && <p className="error-message">* {errors.tagline}</p>}</label>
                            <input
                                type="string"
                                value={tagline}
                                onChange={updateTagline}
                                className={`input-field ${errors.tagline ? 'error' : ''}`}
                            />
                        </div>
                        <div className="descr-input">
                            <label htmlFor="description">Description {errors.description && <p className="error-message">* {errors.description}</p>}</label>
                            <textarea
                                type="text"
                                value={description}
                                onChange={updateDescription}
                                className={` input-field ${errors.description ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image {errors.urls && <p className="error-message">* {errors.urls}</p>}</label>
                            <input
                                type="text"
                                value={image_url}
                                onChange={updateUrl}
                                className={`input-field ${errors.urls ? 'error' : ''}`}
                            />
                        </div>
                    </div>

                    <button className="form-submit-button" type="submit" disabled={validSubmit}>
                        <div className="button-text">
                            Update Campaign ➤
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCampaignForm;
