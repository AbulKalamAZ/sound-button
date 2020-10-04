// Creating action crator that returns file load action

export const updateButtonData = (data) => {
    console.log('action', data);
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_BUTTON_DATA',
            payload: data,
        });
    };
};

// export const loadFile = (data) => {
//     const value = data;
//     return (dispatch) => {
//         setTimeout((data) => {
//             dispatch(loadFileAsync(value));
//         }, 3000);
//     };
// };
