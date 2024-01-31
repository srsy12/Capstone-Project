import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import session from './session'
import campaignReducer from './campaigns';
import rewardReducer from './rewards';
import allCampaignReducer from './allCampaigns';

const rootReducer = combineReducers({
  session,
  campaigns: campaignReducer,
  rewards: rewardReducer,
  allCampaigns: allCampaignReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (preloadedState) => {
  let store = createStore(persistedReducer, preloadedState, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
};

export default configureStore;
