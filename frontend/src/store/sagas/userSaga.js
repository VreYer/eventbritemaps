import { takeLatest, call, put } from 'redux-saga/effects';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import { 
    USER_LOAD_REQUEST
} from '../types';
import { 
    userLoadSuccessed, 
    userLoadFailured
} from '../actions/authActions';

const baseAuthUrl = `http://localhost:4000/users`;

const userApi = async () => {
    try {
        const result = await axios.get(`${baseAuthUrl}`);
        
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* getUser() {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const response = yield call(userApi);
        
        yield put(userLoadSuccessed(response));
    } catch (error) {
        yield put(userLoadFailured(error.message));
    }
}

export function* userLoadWatch() {
    yield takeLatest(USER_LOAD_REQUEST, getUser);
}