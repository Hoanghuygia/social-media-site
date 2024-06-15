import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    headerHeight: 0,
    socket: null,
    image: { 
        file: null,
        url: "",
    }
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
        setImageScreenShot: (state, action) =>{
            state.image = action.payload;
        }
    },
});

export const { setHeaderHeight, setSocket, setImageScreenShot } = windowSlice.actions;

export default windowSlice.reducer;
