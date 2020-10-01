import initialState from './initialState';

//Creating app reducers

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    if (action.type === 'UPDATE_FILE_NAME') {
        newState.fileName[action.payload.name] = action.payload.value;
    }

    return newState;
};

export default reducer;
