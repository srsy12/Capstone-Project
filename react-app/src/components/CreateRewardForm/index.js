import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { createReward } from "../../store/rewards";
import { useLocation } from 'react-router-dom'

function CreateRewardForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { campaignId } = useParams()
    const { pathname } = useLocation();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

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
            <div className="form-container">
                <form className="campaign-form-style" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h1>ADD A REWARD TIER</h1>
                        <p>Tell backers about benefits they would receive by supporting your project</p>
                    </div>
                    <div className="input-container">
                        <div className="form-group">
                            <label htmlFor="name">Tier Name  {errors.name && <p className="error-message">* {errors.name}</p>}</label>
                            <input
                                type="string"
                                placeholder="Give your reward tier a distinct name"
                                value={name}
                                onChange={updateName}
                                className={`input-field ${errors.name ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="goal">Price {errors.price && <p className="error-message">* {errors.price}</p>}</label>
                            <input
                                type="number"
                                placeholder="Enter a price for this reward tier"
                                value={price}
                                onChange={updatePrice}
                                className={`input-field ${errors.price ? 'error' : ''}`}
                            />
                        </div>
                        <div className="descr-input">
                            <label htmlFor="description">Description {errors.description && <p className="error-message">* {errors.description}</p>}</label>
                            <textarea
                                type="text"
                                placeholder="Be as descriptive as possible while describing this tier's benefits."
                                value={description}
                                onChange={updateDescription}
                                className={` input-field ${errors.description ? 'error' : ''}`}
                            />
                        </div>
                    </div>

                    <button className="form-submit-button" type="submit" disabled={validSubmit}>
                        <div className="button-text">
                            Create Reward Tier ➤
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateRewardForm;
