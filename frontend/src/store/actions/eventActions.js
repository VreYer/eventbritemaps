import {
    EVENT_SEARCH_REQUEST,
    EVENT_SEARCH_SUCCESS,
    EVENT_SEARCH_FAILURE
} from '../types';

export const eventsRequest = (term) => {
    return {
        type: EVENT_SEARCH_REQUEST,
        term
    }
 }

export const eventsSuccessed = (data) => {
    return { 
        type: EVENT_SEARCH_SUCCESS, 
        payload: data
    };
}

export const eventsFailured = (message) => {
    return { 
        type: EVENT_SEARCH_FAILURE, 
        payload: message
    };
}