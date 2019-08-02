import { 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAILURE,
    USER_LOADED,
    AUTH_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_LOGIN_REQUEST,
    USER_LOAD_REQUEST
} from "../types";

const initialState = {
    token: localStorage.token,
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                error: null
            }
        case USER_LOAD_REQUEST:
            return {
                ...state,
                isAuthenticated: (localStorage.token) ? true : false,
                loading: true,
                error: null
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
                error: null
            }
        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case USER_REGISTER_FAILURE:
        case USER_LOGIN_FAILURE:
        case USER_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: payload
            }
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export default authReducer;