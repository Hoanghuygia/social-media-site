import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerHeight: 0,
  headerWidth: 0,
  windowHeight: 0,
  windowWidth: 0,
  mainHeight: 0,
  mainWidth: 0,
  navHeight: 0,
  navWidth: 0,
  currentUser: 'huy1234'
};

const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setHeaderHeight: (state, action) => {
      state.headerHeight = action.payload;
    },
    setHeaderWidth: (state, action) => {
      state.headerWidth = action.payload;
    },
    setWindowHeight: (state, action) => {
      state.windowHeight = action.payload;
    },
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setMainHeight: (state, action) => {
      state.mainHeight = action.payload;
    },
    setMainWidth: (state, action) => {
      state.mainWidth = action.payload;
    },
    setNavHeight: (state, action) => {
      state.navHeight = action.payload;
    },
    setNavWidth: (state, action) => {
      state.navWidth = action.payload;
    },
  },
});

export const { 
  setHeaderHeight, 
  setHeaderWidth, 
  setWindowHeight, 
  setWindowWidth, 
  setMainHeight, 
  setMainWidth, 
  setNavHeight, 
  setNavWidth 
} = windowSlice.actions;

export default windowSlice.reducer;
