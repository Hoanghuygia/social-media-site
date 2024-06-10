import { createStore } from "redux";

const initialState = {
    messages: [],
    message: "",
    recepientID: "",
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
        case "DELETE_MESSAGES":
            return{
                ...state,
                messages: [],
            }
        case "CHANGE_RECEPIENT":
            return{
                ...state,
                recepientID: action.payload,
            }
        default:
            return state;
    }
}

const storeMessage = createStore(layoutReducer);

export default storeMessage;
