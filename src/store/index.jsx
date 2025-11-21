import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authAction";
import { breedingApi } from "./breeding/breedingAction";
import { offSpringApi } from "./offSpring/offSpringAction";
import { warehouseApi } from "./warehouse/warehouseAction";
import { invoiceApi } from "./invoice/invoiceAction";
import { foodRationApi } from "./foodRation/foodRationAction";
import { drugUseApi } from "./drugUse/drugUseAction";
import "../locales/i18n";
import { barnHealthApi } from "./health/barnHealthAction";
import { breedingRecordApi } from "./breedingRecord/breedingRecordAction";


const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [pigApi.reducerPath]: pigApi.reducer,
    [typePigApi.reducerPath]: typePigApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            authApi.middleware,
            pigApi.middleware,
            typePigApi.middleware,
            areaApi.middleware
        ),
})


export const persistor = persistStore(store);
export default store;