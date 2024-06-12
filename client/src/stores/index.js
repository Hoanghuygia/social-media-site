// store.js
import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './messageSlice';
import windowReducer from './windowSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    window: windowReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['window/setSocket'],
      ignoredPaths: ['window.socket'],
    },
  }),
});

export default store;
