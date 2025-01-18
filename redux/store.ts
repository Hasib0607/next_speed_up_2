'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { apiSlice } from './features/api/apiSlice';
import { storeApi } from './features/appStore/appStoreApi';
import rootReducer from './rootReducer';

// Create a fallback for environments where localStorage is not available
const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

// Use client storage only if window is defined, otherwise use noop storage (for server-side rendering)
const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore non-serializable values in the register and rehydrate paths
                ignoredPaths: ['register', 'rehydrate'],
                serializableCheck: false, // Disable serializable check
            },
        }).concat(apiSlice.middleware),
});

// Initialize Redux
const initializeApp = async () => {
    await store.dispatch(storeApi.endpoints.getStore.initiate({}));
};

initializeApp();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './features/api/apiSlice';
// import { storeApi } from './features/appStore/appStoreApi';
// import rootReducer from './rootReducer';

// // import { persistStore, persistReducer } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';
// // import compress from 'redux-persist-transform-compress';
// // import { authApi } from './auth/authApi';

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// //   whitelist: [authApi.reducerPath],
// //   transforms: [compress()],
// // };

// // const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: rootReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: (getDefaultMiddlewares) =>
//         getDefaultMiddlewares({ serializableCheck: false }).concat(
//             apiSlice.middleware
//         ),
// });

// // Initialize Redux
// const initializeApp = async () => {
//     await store.dispatch(storeApi.endpoints.getStore.initiate({}));
// };

// initializeApp();

// // export const persistor = persistStore(store());

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
