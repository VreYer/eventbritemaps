import { all } from 'redux-saga/effects';
import {
    registerWatch,
    loginWatch,
    logoutWatch
} from './authSaga';
import { userLoadWatch } from './userSaga';
import { eventsWatch } from './eventSaga';

export default function* rootSaga() {
    yield all([
        registerWatch(),
        loginWatch(),
        logoutWatch(),
        userLoadWatch(),
        eventsWatch()
    ]);
}