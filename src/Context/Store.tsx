import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserAuthApi } from "./API/AUTH_API";
// import { statusAPI } from "./API/ServerStatus";
import Auth from "./Data/Auth";
import Server from "./Data/Server";
import thunk from "redux-thunk";
import { TransactionsAPI } from "./API/Transactions";
import Transactions from "./Data/Transactions";

const rootReducer = combineReducers({
    UserData: Auth,
    Server: Server,
    Transactions: Transactions, 
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [TransactionsAPI.reducerPath]: TransactionsAPI.reducer,
  // [statusAPI.reducerPath]: statusAPI.reducer
})

export type RootState = ReturnType<typeof rootReducer>

// const persistedReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk]
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      {
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}
    ).concat(UserAuthApi.middleware).concat(TransactionsAPI.middleware)
});

setupListeners(Store.dispatch);

export const persistor = persistStore(Store);
