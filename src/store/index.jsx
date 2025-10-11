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
import { serviceApi } from "./service/serviceAction";

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
        [serviceApi.reducerPath]: serviceApi.reducer
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
            serviceApi.middleware
        ),
})


export const persistor = persistStore(store);
export default store;