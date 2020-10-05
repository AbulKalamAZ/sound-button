import { uploadButtonInfoToDatabase } from '../../firebase/utility';

const initState = {
    buttonId: null,
    button: {
        models: null,
        gifs: null,
        audios: null,
        images: null,
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
            uploadButtonInfoToDatabase({ ...state }).then((res) => {
                console.log('button data uploaded', res.id);

                return {
                    ...state,
                    buttonId: res.id,
                };
            });

            return { ...state };
        default:
            return { ...state };
    }
};

export default buttonReducer;
