import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null,
    image: { 
        file: null,
        url: "",
    },
    currentPage: ''
};

const windowSlice = createSlice({
    name: "window",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setImageScreenShot: (state, action) =>{
            state.image = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
});

export const { setSocket, setImageScreenShot, setCurrentPage } = windowSlice.actions;

export default windowSlice.reducer;
