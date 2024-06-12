import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    message: "",
    recepientID: "",
	lastMessageChat: {
		content: "",
		recepientID: ""
	}
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        addMessages: (state, action) => {
            state.messages = state.messages.concat(action.payload);
        },
        deleteMessages: (state) => {
            state.messages = [];
        },
        changeRecepient: (state, action) => {
            state.recepientID = action.payload;
        },
		changeLastMessage: (state, action) =>{
			state.lastMessageChat = action.payload;
		}
    },
});

export const {
    setMessage,
    addMessage,
    addMessages,
    deleteMessages,
    changeRecepient,
	changeLastMessage
} = messageSlice.actions;
export default messageSlice.reducer;
