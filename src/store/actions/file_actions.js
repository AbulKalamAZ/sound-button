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

// Upload file to server

export const uploadFile = (data) => {
    console.log(data);
    return (dispatch) => {
        dispatch({
            type: 'UPLOAD_FILE',
            payload: data,
        });
    };
};
