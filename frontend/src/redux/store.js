import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["userInfo"],
};
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: userPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
