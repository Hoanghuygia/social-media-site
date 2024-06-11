import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './messageSlice';
import windowSlice from './windowSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    window: windowSlice
  },
});

export default store;
