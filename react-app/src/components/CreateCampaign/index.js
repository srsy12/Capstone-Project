import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createCampaign } from "../../store/campaigns";
import "./CreateCampaign.css"

function CreateCampaignForm() {
    const dispatch = useDispatch()
    const history = useHistory()

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
                const createdCampaign = await dispatch(createCampaign(newCampaign));
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="string"
                        placeholder="Enter Name"
                        value={name}
                        onChange={updateName}
                        className={`input-field ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <p className="error-message">* {errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="goal">Price Goal</label>
                    <input
                        type="number"
                        placeholder="Enter a Fundraising Goal for your campaign"
                        value={goal}
                        onChange={updateGoal}
                        className={`input-field ${errors.goal ? 'error' : ''}`}
                    />
                    {errors.goal && <p className="error-message">* {errors.goal}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="string"
                        placeholder="Enter state"
                        value={state}
                        onChange={updateState}
                        className={`input-field ${errors.state ? 'error' : ''}`}
                    />
                    {errors.state && <p className="error-message">* {errors.state}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="string"
                        placeholder="Enter country"
                        value={country}
                        onChange={updateCountry}
                        className={`input-field ${errors.country ? 'error' : ''}`}
                    />
                    {errors.country && <p className="error-message">* {errors.country}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="tagline">Tagline</label>
                    <input
                        type="string"
                        placeholder="Enter tagline"
                        value={tagline}
                        onChange={updateTagline}
                        className={`input-field ${errors.tagline ? 'error' : ''}`}
                    />
                    {errors.tagline && <p className="error-message">* {errors.tagline}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={updateDescription}
                        className={`input-field ${errors.description ? 'error' : ''}`}
                    />
                    {errors.description && <p className="error-message">* {errors.description}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        placeholder="Enter an Image URL"
                        value={image_url}
                        onChange={updateUrl}
                        className={`input-field ${errors.urls ? 'error' : ''}`}
                    />
                    {errors.urls && <p className="error-message">* {errors.urls}</p>}
                </div>

                <button type="submit" disabled={validSubmit}>
                    Create Campaign
                </button>
            </form>
        </div>
    );
}

export default CreateCampaignForm;
