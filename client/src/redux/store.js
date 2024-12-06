import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import sitesReducer from './Site/siteSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers if needed (in case you have multiple slices in the future)
const rootReducer = combineReducers({
  user: userReducer, // Only 'user' reducer for now
  sites: sitesReducer
});

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Wrap the rootReducer with persistReducer to handle persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables warnings for non-serializable values
    }),
});

export const persistor = persistStore(store);
