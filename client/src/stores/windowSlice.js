import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    headerHeight: 0,
    socket: null,
};

const windowSlice = createSlice({
    name: "window",
    initialState,
    reducers: {
        setHeaderHeight: (state, action) => {
            state.headerHeight = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
    },
});

export const { setHeaderHeight, setSocket } = windowSlice.actions;

export default windowSlice.reducer;
