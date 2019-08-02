import { combineReducers } from 'redux';
import auth from './authReducer';
import event from './eventReducer';

const rootReducer = combineReducers({
    auth,
    event
});

export default rootReducer;