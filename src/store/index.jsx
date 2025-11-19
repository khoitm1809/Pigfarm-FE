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
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        ...persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [breedingApi.reducerPath]: breedingApi.reducer,
        [offSpringApi.reducerPath]: offSpringApi.reducer,
        [warehouseApi.reducerPath]: warehouseApi.reducer,
        [invoiceApi.reducerPath]: invoiceApi.reducer,
        [foodRationApi.reducerPath]: foodRationApi.reducer,
        [drugUseApi.reducerPath]: drugUseApi.reducer,
        [barnHealthApi.reducerPath]: barnHealthApi.reducer,
        [breedingRecordApi.reducerPath]: breedingRecordApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            authApi.middleware,
            breedingApi.middleware,
            offSpringApi.middleware,
            warehouseApi.middleware,
            invoiceApi.middleware,
            foodRationApi.middleware,
            drugUseApi.middleware,
            barnHealthApi.middleware,
            breedingRecordApi.middleware
        ),
})


export const persistor = persistStore(store);
export default store;