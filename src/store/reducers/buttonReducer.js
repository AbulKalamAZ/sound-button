const initState = {
    buttonId: '',
    button: {
        models: null,
        modelFormat: null,
        gifs: null,
        audios: null,
        images: null,
        playAudioOnClick: false,
        playAudioAutomatically: true,
        rotateModelByMouse: false,
        rotateModelAutomatically: true,
        redirectTo: null,
        audioPlayingDelay: null,
    },
};

const buttonReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'UPDATE_BUTTON_DATA':
            if (payload.name && payload.value) {
                return {
                    ...state,
                    button: {
                        ...state.button,
                        [payload.name]: payload.value,
                    },
                };
            } else {
                return { ...state };
            }

        case 'UPLOAD_BUTTON_DATA':
            if (payload) {
                return {
                    ...state,
                    buttonId: payload,
                };
            }

            return { ...state };

        case 'SET_PLAY_AUDIO_ON_CLICK':
            return {
                ...state,
                button: {
                    ...state.button,
                    playAudioOnClick: payload,
                    playAudioAutomatically: !payload,
                },
            };

        case 'SET_PLAY_AUDIO_AUTOMATICALLY':
            return {
                ...state,
                button: {
                    ...state.button,
                    playAudioOnClick: !payload,
                    playAudioAutomatically: payload,
                },
            };

        case 'SET_ROTATE_MODEL_BY_MOSUE':
            return {
                ...state,
                button: {
                    ...state.button,
                    rotateModelByMouse: payload,
                    rotateModelAutomatically: !payload,
                },
            };

        case 'SET_ROTATE_MODEL_AUTOMATICALLY':
            return {
                ...state,
                button: {
                    ...state.button,
                    rotateModelByMouse: !payload,
                    rotateModelAutomatically: payload,
                },
            };

        case 'REDIRECT_TO':
            return {
                ...state,
                button: {
                    ...state.button,
                    redirectTo: payload,
                },
            };

        case 'AUDIO_PLAYING_DELAY':
            return {
                ...state,
                button: {
                    ...state.button,
                    audioPlayingDelay: payload,
                },
            };
        default:
            return { ...state };
    }
};

export default buttonReducer;
