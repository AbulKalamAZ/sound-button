// creating update button data

export const updateButtonData = (data) => {
    return {
        type: 'UPDATE_BUTTON_DATA',
        payload: data,
    };
};

// Uload button data to the storage
export const uploadButtonData = () => {
    return {
        type: 'UPLOAD_BUTTON_DATA',
    };
};
