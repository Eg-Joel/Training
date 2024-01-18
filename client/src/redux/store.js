import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import adminReducer from './adminSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistUserConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['loading', 'error'], 
};

const persistAdminConfig = {
  key: 'admin',
  storage: storage,
  blacklist: ['loading', 'error'], 
};

  const userPersistedReducer = persistReducer(persistUserConfig, userReducer)
  const adminLoginPersistedReducer = persistReducer(persistAdminConfig, adminReducer);
  
  const rootReducer = combineReducers({
    user: userPersistedReducer,
    admin: adminLoginPersistedReducer,
  });

  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  export const persistor = persistStore(store);