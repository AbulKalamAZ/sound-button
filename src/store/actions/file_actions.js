import { fileUploadToStorage } from '../../firebase/utility';
import * as buttonActionCreator from '../actions/button_actions';
import * as controlActionCreator from '../actions/control_actions';

// Change file name to UI

export const changeFileName = (data) => {
    return {
        type: 'CHANGE_FILE_NAME',
        payload: data,
    };
};

// Load file to redux

export const loadFile = (data) => {
    return {
        type: 'LOAD_FILE',
        payload: data,
    };
};

//Unload file
export const unloadFile = () => {
    return {
        type: 'UNLOAD_FILE'
    };
};

//File uploading flag

export const fileUploadStarted = () => {
    return { type: 'FILE_UPLOAD_START' };
};

//File upload successfull

export const fileUploadSuccessfull = () => {
    return {
        type: 'FILE_UPLOAD_SUCCESS',
    };
};

//File upload error

export const fileUploadError = () => {
    return {
        type: 'FILE_UPLOAD_ERROR',
    };
};

// Upload file to server

export const uploadFile = (data) => {
    return (dispatch) => {
        //set file uploading flag
        dispatch(fileUploadStarted());
        dispatch(controlActionCreator.openModal());

        //upload file to storage
        const keys = Object.keys(data);

        const fileUploadRequests = keys.map((key) => {
            const fileData = data[key];

            if (fileData !== null && fileData.value) {
                return fileUploadToStorage(fileData);
            }

            return {};
        });

        Promise.all(fileUploadRequests)
            .then((res) => {

                // dispatching update button data
                res.map((item) => {
                    if (item !== {}) {
                        dispatch(
                            buttonActionCreator.updateButtonData({
                                name: item.name,
                                value: item.value,
                            })
                        );
                    } else {
                        console.log(item);
                    }

                    return 0;
                });
            })
            .then(() => {
                // dispatching file uplaod successfull flag
                dispatch(fileUploadSuccessfull());
            })
            .then(() => {
                //dispatching button data upload
                dispatch(buttonActionCreator.uploadButtonData());
            })
            .catch((error) => {
                // dispatching file upload dailed
                dispatch(fileUploadError());
            });
    };
};
