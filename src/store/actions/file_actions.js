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
    return (dispatch, getState) => {
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
                    if (Object.keys(item).length !== 0) {
                        dispatch(
                            buttonActionCreator.updateButtonData({
                                name: item.name,
                                value: item.value,
                            })
                        );
                    } else {
                        console.log('from file action', item);
                    }

                    return 0;
                });
            })
            .then(res => {
                const { playAudioOnClick } = getState().file;

                dispatch(
                    buttonActionCreator.updateButtonData({
                        name: 'playAudioOnClick',
                        value: playAudioOnClick.value,
                    })
                )
            })
            .then(res => {
                const { playAudioAutomatically } = getState().file;

                dispatch(
                    buttonActionCreator.updateButtonData({
                        name: 'playAudioAutomatically',
                        value: playAudioAutomatically.value,
                    })
                )
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


// play audio on click

export const setPlayAudioOnClick = (payload) => {
    return {
        type: 'SET_PLAY_AUDIO_ON_CLICK',
        payload: payload
    }
}


// play audio on automatically

export const setPlayAudioAutomatically = (payload) => {
    return {
        type: 'SET_PLAY_AUDIO_AUTOMATICALLY',
        payload: payload
    }
}