export const openModal = () => {
    return {
        type: 'OPEN_MODAL',
    };
};

export const closeModal = () => {
    return {
        type: 'CLOSE_MODAL',
    };
};

export const setButtonId = () => {
    return {
        type: 'SET_BUTTON_ID',
    };
};

export const playAudio = () => {
    return {
        type: 'PLAY_AUDIO'
    }
}


export const pauseAudio = () => {
    return {
        type: 'PAUSE_AUDIO'
    }
}
