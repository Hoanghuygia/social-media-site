import { createStore } from "redux";

const initialState = {
    messages: [],
    message: "",
};

function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload,
            };
        case "ADD_MESSAGE":
            return{
                ...state,
                messages: [...state.messages, action.payload]
            }
        case "ADD_MESSAGES":
            return{
                ...state,
                messages: [...state.messages, ...action.payload],
            }
        default:
            return state;
    }
}

const storeMessage = createStore(layoutReducer);

export default storeMessage;
