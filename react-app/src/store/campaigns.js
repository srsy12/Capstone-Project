const LOAD_CAMPAIGNS = "LOAD_CAMPAIGNS"

const loadCampaigns = (campaigns) => ({
    type: LOAD_CAMPAIGNS,
    campaigns
})

export const getAllCampaigns = () => async (dispatch) => {
    const res = await fetch(`/api/campaigns`);

    if (res.ok) {
        const campaigns = await res.json();
        dispatch(loadCampaigns(campaigns));
        return campaigns;
    }
};

const campaignReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_CAMPAIGNS:
            newState = {}
            action.campaigns.forEach((campaign) => {
                newState[campaign.id] = campaign;
            });
            return newState;
        default:
            return state;
    }
};

export default campaignReducer;
