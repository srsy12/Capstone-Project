import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { updateReward, singleReward } from "../../store/rewards";
import { useLocation } from 'react-router-dom';

function UpdateRewardForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { rewardId } = useParams()
    const { pathname } = useLocation();
    const reward = useSelector((state) => state?.rewards[rewardId])
    const [name, setName] = useState(reward?.name);
    const [price, setPrice] = useState(reward?.price);
    const [description, setDescription] = useState(reward?.description)
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    useEffect(() => {
        dispatch(singleReward(rewardId));
    }, [dispatch, rewardId]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

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
                const updatedReward = await dispatch(updateReward(rewardId, newReward));
                if (updatedReward) {
                    history.push(`/campaigns/${updatedReward.campaign_id}`);
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
                        <h1>UPDATE A REWARD TIER</h1>
                        <p>Change this reward tier to match your current goals</p>
                    </div>
                    <div className="input-container">
                        <div className="form-group">
                            <label htmlFor="name">Tier Name  {errors.name && <p className="error-message">* {errors.name}</p>}</label>
                            <input
                                type="string"
                                value={name}
                                onChange={updateName}
                                className={`input-field ${errors.name ? 'error' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="goal">Price {errors.price && <p className="error-message">* {errors.price}</p>}</label>
                            <input
                                type="number"
                                value={price}
                                onChange={updatePrice}
                                className={`input-field ${errors.price ? 'error' : ''}`}
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
                    </div>

                    <button className="form-submit-button" type="submit" disabled={validSubmit}>
                        <div className="button-text">
                            Update this Tier ➤
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateRewardForm;
