const GET_REWARDS = "GET_REWARDS"
const SINGLE_REWARD = "SINGLE_REWARD"
const CREATE_REWARD = "CREATE_REWARD"
const UPDATE_REWARD = "UPDATE_REWARD"
const DELETE_REWARD = "DELETE_REWARD"

const getCampaignRewardsAction = (rewards) => ({
    type: GET_REWARDS,
    rewards
})

const createRewardAction = (rewardDetails) => ({
    type: CREATE_REWARD,
    rewardDetails
})

const updateRewardAction = (rewardDetails) => ({
    type: UPDATE_REWARD,
    rewardDetails
})

const singleRewardAction = (reward) => ({
    type: SINGLE_REWARD,
    reward
})

const deleteRewardAction = (rewardId) => ({
    type: DELETE_REWARD,
    rewardId
})

export const singleReward = (rewardId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/${rewardId}`)

    if (res.ok) {
        const reward = await res.json();
        dispatch(singleRewardAction(reward))
        return reward
    }
}
export const getOneRewards = (campaignId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/campaign/${campaignId}`)

    if (res.ok) {
        const rewards = await res.json();
        dispatch(getCampaignRewardsAction(rewards))
        return rewards;
    }
}


export const createReward = (campaignId, rewardDetails) => async (dispatch) => {
    const res = await fetch(`/api/rewards/campaign/${campaignId}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rewardDetails),
    })

    if (res.ok) {
        const reward = await res.json()
        dispatch(createRewardAction(reward))
        return reward
    }
}

export const updateReward = (rewardId, rewardDetails) => async (dispatch) => {
    const res = await fetch(`/api/rewards/edit/${rewardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rewardDetails),
    })

    if (res.ok) {
        const reward = await res.json()
        dispatch(updateRewardAction(reward))
        return reward
    }
}

export const deleteReward = (rewardId) => async (dispatch) => {
    const res = await fetch(`/api/rewards/delete/${rewardId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const deleted = await res.json();
        dispatch(deleteRewardAction(rewardId))
        return deleted;
    }
}

const rewardReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_REWARDS:
            newState = {}
            action.rewards.forEach((reward) => {
                newState[reward.id] = reward;
            });
            return newState;
        case SINGLE_REWARD:
            newState[action.reward.id] = action.reward
            return newState
        case DELETE_REWARD:
            delete newState[action.rewardId]
            return newState
        default:
            return state;
    }
};

export default rewardReducer;
