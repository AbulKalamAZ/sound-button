//deinign initial state

const initState = {
    isFileUploaded: false,
    isFileUploadStarted: false,
    isFileUploadError: false,
    isModalOpen: false,
    isCreateButtonDisabled: false,
    playAudio: false,
    showFrameModal: false,
    showIFrame: false,
};

const createReducer = (state = initState, action) => {
    const { type } = action;

    switch (type) {
        case 'FILE_UPLOAD_START':
            return {
                ...state,
                isFileUploadStarted: true,
                isCreateButtonDisabled: true,
            };

        case 'FILE_UPLOAD_SUCCESS':
            return {
                ...state,
                isFileUploaded: true,
            };

        case 'FILE_UPLOAD_ERROR':
            return {
                ...state,
                isFileUploadStarted: false,
                isFileError: true,
            };

        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: true,
            };

        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false,
                isCreateButtonDisabled: false,
                isFileUploaded: false,
            };

        case 'OPEN_FRAME_MODAL':
            return {
                ...state,
                showFrameModal: true,
            };

        case 'CLOSE_FRAME_MODAL':
            return {
                ...state,
                showFrameModal: false,
            };

        case 'SET_BUTTON_ID':
            return {
                ...state,
                isFileUploadStarted: false,
            };

        case 'PLAY_AUDIO':
            return {
                ...state,
                playAudio: true,
            };

        case 'PAUSE_AUDIO':
            return {
                ...state,
                playAudio: false,
            };

        case 'SHOW_FRAME':
            return {
                ...state,
                showIFrame: true,
            };

        default:
            return { ...state };
    }
};

export default createReducer;
