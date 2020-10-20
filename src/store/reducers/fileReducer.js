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
    images: {
        defaultFileName: 'No file choosen',
        fileValue: {},
    },
    playAudioOnClick: {
        value: false
    },
    playAudioAutomatically: {
        value: true
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

        case 'UNLOAD_FILE':
            return {
                ...state,
                models: {
                    ...state.models,
                    defaultFileName: 'No File Choosen',
                    fileValue: null
                },
                gifs: {
                    ...state.gifs,
                    defaultFileName: 'No File Choosen',
                    fileValue: null
                },
                audios: {
                    ...state.audios,
                    defaultFileName: 'No File Choosen',
                    fileValue: {}
                },
                images: {
                    ...state.images,
                    defaultFileName: 'No File Choosen',
                    fileValue: {}
                }
            }

        case 'FILE_UPLOAD_START':

            return { ...state };

        case 'FILE_UPLOAD_SUCCESS':

            return { ...state };

        case 'FILE_UPLOAD_ERROR':

            return { ...state };

        case 'SET_PLAY_AUDIO_ON_CLICK':
            return {
                ...state,
                playAudioOnClick: {
                    ...state.playAudioOnClick,
                    value: payload 
                },
                playAudioAutomatically: {
                    ...state.playAudioAutomatically,
                    value: !payload
                }
            }

        case 'SET_PLAY_AUDIO_AUTOMATICALLY':
            return {
                ...state,
                playAudioOnClick: {
                    ...state.playAudioOnClick,
                    value: !payload 
                },
                playAudioAutomatically: {
                    ...state.playAudioAutomatically,
                    value: payload
                }
            }
        default:
            return { ...state };
    }
};

export default fileReducer;
