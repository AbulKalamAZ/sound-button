const initState = {
  buttonId: '',
  button: {
    models: null,
    modelFormat: null,
    gifs: null,
    audios: null,
    images: null,
    playAudioOnClick: false,
    playAudioAutomatically: true,
    playAudioOnce: true,
    playAudioInLoop: false,
    rotateModelByMouse: false,
    rotateModelAutomatically: true,
    openLinkInAniFrame: false,
    redirectTo: null,
    frameWidth: 768,
    frameHeight: 1024,
    framePositionFromLeft: 0,
    framePositionFromTop: 0,
    audioPlayingDelay: null,
    changeBackground: false,
    noBackground: false,
    posX: null,
    posY: null,
    posZ: null,
    negX: null,
    negY: null,
    negZ: null,
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
      if (payload) {
        return {
          ...state,
          buttonId: payload,
        };
      }

      return { ...state };

    case 'SET_PLAY_AUDIO_ON_CLICK':
      return {
        ...state,
        button: {
          ...state.button,
          playAudioOnClick: payload,
          playAudioAutomatically: !payload,
        },
      };

    case 'SET_PLAY_AUDIO_AUTOMATICALLY':
      return {
        ...state,
        button: {
          ...state.button,
          playAudioOnClick: !payload,
          playAudioAutomatically: payload,
        },
      };

    case 'SET_ROTATE_MODEL_BY_MOSUE':
      return {
        ...state,
        button: {
          ...state.button,
          rotateModelByMouse: payload,
          rotateModelAutomatically: !payload,
        },
      };

    case 'SET_ROTATE_MODEL_AUTOMATICALLY':
      return {
        ...state,
        button: {
          ...state.button,
          rotateModelByMouse: !payload,
          rotateModelAutomatically: payload,
        },
      };

    case 'SET_PLAY_AUDIO_ONCE':
      return {
        ...state,
        button: {
          ...state.button,
          playAudioOnce: payload,
          playAudioInLoop: !payload,
        },
      };

    case 'SET_PLAY_AUDIO_IN_LOOP':
      return {
        ...state,
        button: {
          ...state.button,
          playAudioOnce: !payload,
          playAudioInLoop: payload,
        },
      };

    case 'REDIRECT_TO':
      return {
        ...state,
        button: {
          ...state.button,
          redirectTo: payload,
        },
      };

    case 'OPEN_LINK_IN_AN_IFRAME':
      return {
        ...state,
        button: {
          ...state.button,
          openLinkInAniFrame: payload,
        },
      };

    case 'SET_FRAME_WIDTH':
      return {
        ...state,
        button: {
          ...state.button,
          frameWidth: payload,
        },
      };

    case 'SET_FRAME_HEIGHT':
      return {
        ...state,
        button: {
          ...state.button,
          frameHeight: payload,
        },
      };

    case 'SET_FRAME_POSITION_LEFT':
      return {
        ...state,
        button: {
          ...state.button,
          framePositionFromLeft: payload,
        },
      };

    case 'SET_FRAME_POSITION_TOP':
      return {
        ...state,
        button: {
          ...state.button,
          framePositionFromTop: payload,
        },
      };

    case 'AUDIO_PLAYING_DELAY':
      return {
        ...state,
        button: {
          ...state.button,
          audioPlayingDelay: payload,
        },
      };

    case 'SET_CHANGE_BACKGROUND':
      return {
        ...state,
        button: {
          ...state.button,
          changeBackground: payload,
        },
      };

    case 'SET_NO_BACKGROUND':
      return {
        ...state,
        button: {
          ...state.button,
          noBackground: payload,
        },
      };

    default:
      return { ...state };
  }
};

export default buttonReducer;
