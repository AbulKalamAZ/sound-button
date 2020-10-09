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
            console.log('File upload started');

            return { ...state };

        case 'FILE_UPLOAD_SUCCESS':
            console.log('File uploaded successfully');

            return { ...state };

        case 'FILE_UPLOAD_ERROR':
            console.log('File upload failed');

            return { ...state };

        default:
            return { ...state };
    }
};

export default fileReducer;
