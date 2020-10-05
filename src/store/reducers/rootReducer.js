import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import buttonReducer from './buttonReducer';
import controlReducer from './controlReducer';

const rootReducer = combineReducers({
    file: fileReducer,
    button: buttonReducer,
    control: controlReducer,
});

export default rootReducer;
