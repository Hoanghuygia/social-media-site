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
      ignoredActions: ['window/setSocket', 'window/setImage'],
      ignoredPaths: ['window.socket', 'window.image.file'], 
    },
  }),
});

export default store;