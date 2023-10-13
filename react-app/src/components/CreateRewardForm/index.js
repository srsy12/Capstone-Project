import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { createReward } from "../../store/rewards";

function CreateRewardForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { campaignId } = useParams()

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();


        const errors = {};
        if (!name) {
            errors.name = "Name is required"
        }
        if (!price) {
            errors.price = "Price is required"
        }
        if (!description) {
            errors.description = "Description is required"
        }
        setErrors(errors)

        if (Object.values(errors).length === 0) {
            setValidSubmit(true);

            const newReward = {
                name,
                description,
                price,
            };

            try {
                const createdReward = await dispatch(createReward(campaignId, newReward));
                if (createdReward) {
                    history.push(`/campaigns/${campaignId}`);
                }
            } catch (error) {
                console.error("Reward Tier creation failed:", error);

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
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        placeholder="Enter a price for this reward tier"
                        value={price}
                        onChange={updatePrice}
                        className={`input-field ${errors.price ? 'error' : ''}`}
                    />
                    {errors.price && <p className="error-message">* {errors.price}</p>}
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
                <button type="submit" disabled={validSubmit}>
                    Create Reward Tier
                </button>
            </form>
        </div>
    );
}

export default CreateRewardForm;
