// import { fileUploadToStorage } from '../../firebase/utility';
// import { updateButtonData } from '../actions/action';

// Initial state of this reducer
const initState = {
    models: {
        defaultFileName: 'No file choosen',
        fileValue: null,
    },
    gifs: {
        defaultFileName: 'No file choosen',
        fileValue: null,
    },
    audios: {
        defaultFileName: 'No file choosen',
        fileValue: {},
    },
    hoverAudios: {
        defaultFileName: 'No file choosen',
        fileValue: {},
    },
};

const fileReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_FILE_NAME':
            return {
                ...state,
                [payload.name]: {
                    ...state[payload.name],
                    defaultFileName: payload.fileName,
                },
            };

        case 'LOAD_FILE':
            return {
                ...state,
                [payload.name]: {
                    ...state[payload.name],
                    fileValue: Object.assign({}, payload),
                },
            };

        case 'UPLOAD_FILE':
            return { ...state };

        default:
            return { ...state };
    }
};

export default fileReducer;
