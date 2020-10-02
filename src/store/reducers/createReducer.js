const initState = {};

const createReducer = (state = initState, action) => {
    const newState = { ...state };

    return newState;
};

export default createReducer;
