const LOAD_CAMPAIGNS = "LOAD_CAMPAIGNS"
const CAMPAIGN_DETAIL = "CAMPAIGN_DETAIL"
const CREATE_CAMPAIGN = "CREATE_CAMPAIGN"

const loadCampaigns = (campaigns) => ({
    type: LOAD_CAMPAIGNS,
    campaigns
})

const oneCampaign = (campaign) => ({
    type: CAMPAIGN_DETAIL,
    campaign
})

const createCampaignAction = (campaignDetails) => ({
    type: CREATE_CAMPAIGN,
    campaignDetails
})

export const getAllCampaigns = () => async (dispatch) => {
    const res = await fetch(`/api/campaigns`);

    if (res.ok) {
        const campaigns = await res.json();
        dispatch(loadCampaigns(campaigns));
        return campaigns;
    }
};

export const getOneCampaign = (campaignId) => async (dispatch) => {
    const res = await fetch(`/api/campaigns/${campaignId}`)

    if (res.ok) {
        const campaign = await res.json();
        dispatch(oneCampaign(campaign));
        return campaign;
    }
}

export const createCampaign = (campaignData) => async (dispatch) => {
    const res = await fetch("/api/campaigns/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
    });

    if (res.ok) {
        const newCampaign = await res.json();
        dispatch(createCampaignAction(newCampaign));
        return newCampaign;
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
        case CAMPAIGN_DETAIL:
            newState[action.campaign.id] = action.campaign
            return newState
        default:
            return state;
    }
};

export default campaignReducer;
