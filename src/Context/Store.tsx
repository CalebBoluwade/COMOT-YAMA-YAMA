import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserAuthApi } from "./API/AUTH_API";
// import { statusAPI } from "./API/ServerStatus";
import Auth from "./Data/Auth";
import Server from "./Data/Server";
import Vendor from "./Data/Vendor";
import thunk from "redux-thunk";
import { TransactionsAPI } from "./API/TRANSACTIONS_API";
import Transactions from "./Data/Transactions";
import { UserRefApi } from "./API/REFERRAL_API";
import { VendorApi } from "./API/VENDOR_API";
import { DisposeRecycleAPI } from "./API/SERVICES_API";

const rootReducer = combineReducers({
    UserData: Auth,
    Server: Server,
    Vendor: Vendor,
    Transactions: Transactions,
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [VendorApi.reducerPath]: VendorApi.reducer,
  [DisposeRecycleAPI.reducerPath]: DisposeRecycleAPI.reducer,
  [TransactionsAPI.reducerPath]: TransactionsAPI.reducer,
  [UserRefApi.reducerPath]: UserRefApi.reducer
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
    ).concat(UserAuthApi.middleware).concat(VendorApi.middleware).concat(DisposeRecycleAPI.middleware).concat(TransactionsAPI.middleware).concat(UserRefApi.middleware)
});

setupListeners(Store.dispatch);

export const persistor = persistStore(Store);
