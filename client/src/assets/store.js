import { createStore } from 'redux';

const initialState = {
  headerHeight: 0,
  headerWidth: 0,
  windowHeight: 0,
  windowWidth: 0,
  mainHeight: 0,
  mainWidth: 0
};


function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_HEADER_HEIGHT':
      return {
        ...state,
        headerHeight: action.payload
      };
    case 'SET_HEADER_WIDTH':
      return {
        ...state,
        headerWidth: action.payload
      };
    case 'SET_WINDOW_HEIGHT':
      return {
        ...state,
        windowHeight: action.payload
      };
    case 'SET_WINDOW_WIDTH':
      return {
        ...state,
        windowWidth: action.payload
      };
    case 'SET_MAIN_HEIGHT':
        return {
            ...state,
            mainHeight: action.payload
        };
    case 'SET_MAIN_WIDTH':
        return {
            ...state,
            mainWidth: action.payload
        };
    default:
      return state;
  }
}

const store = createStore(layoutReducer);

export default store;
