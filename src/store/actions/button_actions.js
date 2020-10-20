import { uploadButtonInfoToDatabase } from '../../firebase/utility';
import * as controlActionCreator from '../actions/control_actions';
import * as fileActionCreator from '../actions/file_actions';
// creating update button data

export const updateButtonData = (data) => {
    return {
        type: 'UPDATE_BUTTON_DATA',
        payload: data,
    };
};

// Upload button data to the storage
export const uploadButtonData = () => {
    return (dispatch, getState) => {
        const buttonInfo = getState().button.button;


        uploadButtonInfoToDatabase(buttonInfo).then((res) => {
            dispatch({ type: 'UPLOAD_BUTTON_DATA', payload: res.id });
            
        }).then(() => {
            dispatch(controlActionCreator.setButtonId())
        }).then(() => {
            dispatch(fileActionCreator.unloadFile())
        });
    };
};
