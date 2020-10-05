export const openModal = () => {
    return {
        type: 'OPEN_MODAL',
    };
};

export const closeModal = () => {
    console.log('from control action');
    return {
        type: 'CLOSE_MODAL',
    };
};
