import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import CampaignDetailPage from "./components/CampaignDetail";
import CreateCampaignForm from "./components/CreateCampaign";
import UpdateCampaignForm from "./components/UpdateCampaign";
import CreateRewardForm from "./components/CreateRewardForm";
import UpdateRewardForm from "./components/UpdateRewardForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/campaigns/:campaignId/rewards/new">
            <CreateRewardForm />
          </Route>
          <Route path="/campaigns/update/:campaignId">
            <UpdateCampaignForm />
          </Route>
          <Route path="/campaigns/new">
            <CreateCampaignForm />
          </Route>
          <Route path="/campaigns/:campaignId">
            <CampaignDetailPage />
          </Route>
          <Route path="/rewards/update/:rewardId">
            <UpdateRewardForm />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
