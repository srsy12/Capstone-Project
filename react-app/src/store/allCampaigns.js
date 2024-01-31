const ALL_CAMPAIGNS = "ALL_CAMPAIGNS"

const allAction = (allCampaigns) => ({
    type: ALL_CAMPAIGNS,
    allCampaigns,
})

export const getAllOfCampaigns = () => async (dispatch) => {
    const res = await fetch(`/api/campaigns`);

    if (res.ok) {
        const allCampaigns = await res.json();
        dispatch(allAction(allCampaigns));
        return res
    }
}

const allCampaignReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ALL_CAMPAIGNS:
            newState = {}
            action.allCampaigns.forEach((allCampaign) => {
                newState[allCampaign.id] = allCampaign;
            });
            return newState
        default:
            return state;
    }
};

export default allCampaignReducer;
