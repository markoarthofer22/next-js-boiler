import { SET_GLOBALS, SET_IS_LOADING } from "./globals.types";

const INITIAL_STATE = {
    settings: null,
    isLoading: false
};

const globalsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case SET_GLOBALS:
            return {
                ...state,
                settings: action.payload
            };

        default:
            return state;
    }
};

export default globalsReducer;
