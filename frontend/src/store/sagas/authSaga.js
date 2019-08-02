import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { 
    USER_REGISTER_REQUEST,
    USER_LOGIN_REQUEST,
    USER_LOGOUT_REQUEST
} from '../types';
import { 
    registerSuccessed, 
    registerFailured, 
    loginFailured, 
    loginSuccessed 
} from '../actions/authActions';
import { logout } from '../actions/authActions';

const baseAuthUrl = `http://localhost:4000/users`;

const authApi = async (action, userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(userData);

    try {
        const result = await axios.post(`${baseAuthUrl}/${action}`, body, config);
        
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* registerEffect(action) {
    try {
        const response = yield call(authApi, 'signup', action);

        yield put(registerSuccessed(response));
    } catch (error) {
        yield put(registerFailured(error.response.data.msg));
    }
}

function* loginEffect(action) {
    try {
        const response = yield call(authApi, 'login', action);
        
        yield put(loginSuccessed(response));
    } catch (error) {
        yield put(loginFailured(error.response.data.msg));
    }
}

function* logoutEffect() {
    yield put(logout());
}

export function* registerWatch() {
    yield takeLatest(USER_REGISTER_REQUEST, registerEffect);
}
  
export function* loginWatch() {
    yield takeLatest(USER_LOGIN_REQUEST, loginEffect);
}

export function* logoutWatch() {
    yield takeLatest(USER_LOGOUT_REQUEST, logoutEffect);
}