import { combineReducers } from 'redux';
import buttonReducer from './buttonReducer';
import createReducer from './createReducer';

const rootReducer = combineReducers({
    button: buttonReducer,
    create: createReducer,
});

export default rootReducer;
