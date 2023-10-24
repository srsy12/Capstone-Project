import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createCampaign } from "../../store/campaigns";
import { useLocation } from 'react-router-dom'
import "./CreateCampaign.css"

function CreateCampaignForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { pathname } = useLocation();
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [tagline, setTagline] = useState("");
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);


    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value);
    const updateGoal = (e) => setGoal(e.target.value);
    const updateUrl = (e) => setImageUrl(e.target.value);
    const updateTagline = (e) => setTagline(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

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
        } else if (name.length < 5) {
            errors.name = "Name must be longer than 5 letters"
        }
        if (!goal) {
            errors.goal = "Goal is required"
        } else if (goal <= 0) {
            errors.goal = "Price goal must be a positive number"
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
                const createdCampaign = await dispatch(createCampaign(newCampaign));
                if (createdCampaign) {
                    history.push(`/campaigns/${createdCampaign.id}/rewards/new`);
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
                        <h1>CREATE YOUR CAMPAIGN</h1>
                        <p>Take the first step into getting your project off the ground</p>
                    </div>
                    <div className="input-container">
                        <div className="form-group">
                            <label htmlFor="name">Name  {errors.name && <p className="error-message">* {errors.name}</p>}</label>
                            <input
                                type="string"
                                placeholder="Every good project needs an eyecatching name"
                                value={name}
                                onChange={updateName}
                                className={`input-field ${errors.name ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="goal">Price Goal {errors.goal && <p className="error-message">* {errors.goal}</p>}</label>
                            <input
                                type="number"
                                placeholder="Enter a fundraising goal for your campaign"
                                value={goal}
                                onChange={updateGoal}
                                className={`input-field ${errors.goal ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State {errors.state && <p className="error-message">* {errors.state}</p>}</label>
                            <input
                                type="string"
                                placeholder="Enter the state you are based in"
                                value={state}
                                onChange={updateState}
                                className={`input-field ${errors.state ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country {errors.country && <p className="error-message">* {errors.country}</p>}</label>
                            <input
                                type="string"
                                placeholder="Enter the country you are based in"
                                value={country}
                                onChange={updateCountry}
                                className={`input-field ${errors.country ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tagline">Tagline {errors.tagline && <p className="error-message">* {errors.tagline}</p>}</label>
                            <input
                                type="string"
                                placeholder="Enter a tagline for your campaign"
                                value={tagline}
                                onChange={updateTagline}
                                className={`input-field ${errors.tagline ? 'error' : ''}`}
                            />
                        </div>
                        <div className="descr-input">
                            <label htmlFor="description">Description {errors.description && <p className="error-message">* {errors.description}</p>}</label>
                            <textarea
                                type="text"
                                placeholder="Be as descriptive as possible while describing your project."
                                value={description}
                                onChange={updateDescription}
                                className={` input-field ${errors.description ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image {errors.urls && <p className="error-message">* {errors.urls}</p>}</label>
                            <input
                                type="text"
                                placeholder="Enter an Image URL"
                                value={image_url}
                                onChange={updateUrl}
                                className={`input-field ${errors.urls ? 'error' : ''}`}
                            />
                        </div>
                    </div>

                    <button className="form-submit-button" type="submit" disabled={validSubmit}>
                        <div className="button-text">
                            Add Your First Reward Tier ➤
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCampaignForm;
