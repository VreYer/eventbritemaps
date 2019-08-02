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
    USER_LOAD_REQUEST,
    USER_LOGOUT_REQUEST
} from '../types';

export const registerRequest = ({ username, email, password }) => {
    return {
      type: USER_REGISTER_REQUEST,
      username,
      email,
      password,
    }
 }

export const registerSuccessed = (data) => {
    return { 
        type: USER_REGISTER_SUCCESS, 
        payload: data
    };
}

export const registerFailured = (message) => {
    return { 
        type: USER_REGISTER_FAILURE, 
        payload: message
    };
}

export const loginRequest = ({ email, password }) => {
    return {
      type: USER_LOGIN_REQUEST,
      email,
      password,
    }
}

export const loginSuccessed = (data) => {
    return { 
        type: USER_LOGIN_SUCCESS, 
        payload: data
    };
}

export const loginFailured = (message) => {
    return { 
        type: USER_LOGIN_FAILURE, 
        payload: message
    };
}

export const loadUserRequest = () => { 
    return {
      type: USER_LOAD_REQUEST
    }
}

export const userLoadSuccessed = (data) => {
    return {
        type: USER_LOADED,
        payload: data
    }
}

export const userLoadFailured = (message) => {
    return {
        type: AUTH_ERROR,
        payload: message
    }
}

export const logoutRequest = () => {
    return { 
        type: USER_LOGOUT_REQUEST
    };
}

export const logout = () => {
    return { 
        type: USER_LOGOUT
    };
}