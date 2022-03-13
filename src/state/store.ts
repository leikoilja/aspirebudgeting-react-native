/*
 eslint-disable
 @typescript-eslint/no-unsafe-argument,
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/no-unsafe-call,
 */
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./reducers/UserReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const reducers = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

/* eslint-disable no-underscore-dangle */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);
/* eslint-enable */

const persistor = persistStore(store);

export { store, persistor };
