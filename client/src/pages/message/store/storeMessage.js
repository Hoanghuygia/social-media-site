import { createStore } from "redux";

const initialState = {
    messages: [
        {
            content: "ABC",
            imageURL: null,
            user: true 
        },
        {
            content: "Box Chakra UI/React",
            imageURL: null,
            user: true
        },
        {
            content: "you'd like to truncate the text after a specific number of lines, pass the noOfLines prop. This will render an ellipsis when the text exceeds the width of the viewport or maxWidth prop.",
            imageURL: null,
            user: true
        },
        {
            content: "ABC",
            imageURL: null,
            user: true
        }
    ],
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
                // messages: [...state.messages, ...action.payload], nếu để vậy là nó sẽ phân rã cái payload ra rồi mới add vào messages
                messages: [...state.messages, action.payload]
            }
        default:
            return state;
    }
}

const storeMessage = createStore(layoutReducer);

export default storeMessage;
