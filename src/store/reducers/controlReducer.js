//deinign initial state

const initState = {
    isFileUploaded: false,
    isFileUploadStarted: false,
    isFileUploadError: false,
    openModal: false,
};

const createReducer = (state = initState, action) => {
    const { type } = action;

    switch (type) {
        case 'FILE_UPLOAD_START':
            return {
                ...state,
                isFileUploadStarted: true,
            };

        case 'FILE_UPLOAD_SUCCESS':
            return {
                ...state,
                isFileUploadStarted: false,
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
                openModal: true,
            };

        case 'CLOSE_MODAL':
            console.log('modal closed');
            return {
                ...state,
                openModal: false,
            };
        default:
            return { ...state };
    }
};

export default createReducer;
