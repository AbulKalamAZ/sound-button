import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import buttonReducer from './buttonReducer';
import createReducer from './createReducer';

const rootReducer = combineReducers({
    file: fileReducer,
    button: buttonReducer,
    create: createReducer,
});

export default rootReducer;
