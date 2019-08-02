import { 
    EVENT_SEARCH_SUCCESS,
    EVENT_SEARCH_FAILURE,
    EVENT_SEARCH_REQUEST,
    USER_LOGOUT
} from "../types";

const initialState = {
    loading: false,
    error: null,
    events: {}
}

const eventReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case EVENT_SEARCH_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }
        case EVENT_SEARCH_SUCCESS:
            return {
                ...state,
                events: payload,
                error: null,
                loading: false
            }
        case EVENT_SEARCH_FAILURE:
            return {
                ...state,
                events: {},
                error: payload,
                loading: false
            }
        case USER_LOGOUT:
            return {
                loading: false,
                error: null,
                events: {}
            }
        default:
            return state
    }
}

export default eventReducer;
