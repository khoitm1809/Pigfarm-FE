import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authAction";
import "../locales/i18n";
import { pigApi } from "./pig/pigAction";
import { areaApi } from "./area/areaAction";
import { typePigApi } from "./typePig/typePigAction";


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