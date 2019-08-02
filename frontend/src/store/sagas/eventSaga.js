import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { 
    EVENT_SEARCH_REQUEST
} from '../types';
import { 
    eventsSuccessed, 
    eventsFailured
} from '../actions/eventActions';
import { REACT_EVENTBRITE_PUBLIC_KEY } from '../../utils/constants';

const eventsUrl = `https://www.eventbriteapi.com/v3/events`;

const eventsApi = async (term) => {
    delete axios.defaults.headers.common['x-auth-token'];

    try {
        delete axios.defaults.headers.common['x-auth-token'];
        const result = await axios.get(`${eventsUrl}/search/?location.address=${term}&expand=organizer,venue&token=${REACT_EVENTBRITE_PUBLIC_KEY}`);
        
        return result.data;
    } catch (error) {
        throw error;
    }
}

function* getEvents({ term }) {
    try {
        const response = yield call(eventsApi, term);
        yield put(eventsSuccessed(response));
    } catch (error) {
        yield put(eventsFailured(error.response.data.error_description));
    }
}

export function* eventsWatch() {
    yield takeLatest(EVENT_SEARCH_REQUEST, getEvents);
}