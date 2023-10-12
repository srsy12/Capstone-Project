const LOAD_CAMPAIGNS = "LOAD_CAMPAIGNS"
const CAMPAIGN_DETAIL = "CAMPAIGN_DETAIL"
const CREATE_CAMPAIGN = "CREATE_CAMPAIGN"
const UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN"
const DELETE_CAMPAIGN = "DELETE_CAMPAIGN"

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

const updateCampaignAction = (campaignDetails) => ({
    type: UPDATE_CAMPAIGN,
    campaignDetails
})

const deleteCampaignAction = (campaignId) => ({
    type: DELETE_CAMPAIGN,
    campaignId
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

export const updateCampaign = (campaignData, campaignId) => async (dispatch) => {
    const res = await fetch(`/api/campaigns/update/${campaignId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
    });

    if (res.ok) {
        const updatedCampaign = await res.json();
        dispatch(updateCampaignAction(updatedCampaign));
        return updatedCampaign;
    }
};

export const deleteCampaign = (campaignId) => async (dispatch) => {
    const res = await fetch(`/api/campaigns/delete/${campaignId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const deleted = await res.json();
        dispatch(deleteCampaignAction(campaignId))
        return deleted;
    }
}


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
        case DELETE_CAMPAIGN:
            delete newState[action.campaignId]
            return newState
        default:
            return state;
    }
};

export default campaignReducer;
