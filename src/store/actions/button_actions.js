import { uploadButtonInfoToDatabase } from '../../firebase/utility';
// creating update button data

export const updateButtonData = (data) => {
    return {
        type: 'UPDATE_BUTTON_DATA',
        payload: data,
    };
};

// Uload button data to the storage
export const uploadButtonData = () => {
    return (dispatch, getState) => {
        const buttonInfo = getState().button.button;

        uploadButtonInfoToDatabase(buttonInfo).then((res) => {
            dispatch({ type: 'UPLOAD_BUTTON_DATA', payload: res.id });
            
        });
    };
};
