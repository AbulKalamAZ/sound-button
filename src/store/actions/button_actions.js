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

        uploadButtonInfoToDatabase(buttonInfo)
            .then((res) => {
                dispatch({ type: 'UPLOAD_BUTTON_DATA', payload: res.id });
            })
            .then(() => {
                dispatch(controlActionCreator.setButtonId());
            })
            .then(() => {
                dispatch(fileActionCreator.unloadFile());
            });
    };
};

// play audio on click

export const setPlayAudioOnClick = (payload) => {
    return {
        type: 'SET_PLAY_AUDIO_ON_CLICK',
        payload: payload,
    };
};

// play audio on automatically

export const setPlayAudioAutomatically = (payload) => {
    return {
        type: 'SET_PLAY_AUDIO_AUTOMATICALLY',
        payload: payload,
    };
};

// rotate model by mouse

export const setRotateModelByMouse = (payload) => {
    return {
        type: 'SET_ROTATE_MODEL_BY_MOSUE',
        payload: payload,
    };
};

// rotate model automatically

export const setRotateModelAutomatically = (payload) => {
    return {
        type: 'SET_ROTATE_MODEL_AUTOMATICALLY',
        payload: payload,
    };
};

// redirect to a website link

export const setRedirectTo = (payload) => {
    return {
        type: 'REDIRECT_TO',
        payload: payload,
    };
};

// set audio playing delay in seconds

export const setAudioPlayingDelay = (payload) => {
    return {
        type: 'AUDIO_PLAYING_DELAY',
        payload: payload,
    };
};
