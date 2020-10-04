const initState = {
    models: null,
    gifs: null,
    audios: null,
    hoverAudios: null,
};

const buttonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_BUTTON_DATA':
            console.log('buttonreducer', action.payload);
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return { ...state };
    }
};

export default buttonReducer;
