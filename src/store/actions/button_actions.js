import { uploadButtonInfoToDatabase } from "../../firebase/utility";
import * as controlActionCreator from "../actions/control_actions";
import * as fileActionCreator from "../actions/file_actions";
// creating update button data

export const updateButtonData = (data) => {
  return {
    type: "UPDATE_BUTTON_DATA",
    payload: data,
  };
};

// Upload button data to the storage
export const uploadButtonData = () => {
  return (dispatch, getState) => {
    const buttonInfo = getState().button.button;

    console.log("From button actions", buttonInfo);

    uploadButtonInfoToDatabase(buttonInfo)
      .then((res) => {
        dispatch({ type: "UPLOAD_BUTTON_DATA", payload: res.id });
      })
      .then(() => {
        dispatch(controlActionCreator.setButtonId());
      })
      .then(() => {
        dispatch(fileActionCreator.unloadFile());
      });
  };
};

// play audio on click

export const setPlayAudioOnClick = (payload) => {
  return {
    type: "SET_PLAY_AUDIO_ON_CLICK",
    payload: payload,
  };
};

// play audio on automatically

export const setPlayAudioAutomatically = (payload) => {
  return {
    type: "SET_PLAY_AUDIO_AUTOMATICALLY",
    payload: payload,
  };
};

// play audio once

export const setPlayAudioOnce = (payload) => {
  return {
    type: "SET_PLAY_AUDIO_ONCE",
    payload: payload,
  };
};

// play audio in loop

export const setPlayAudioInLoop = (payload) => {
  return {
    type: "SET_PLAY_AUDIO_IN_LOOP",
    payload: payload,
  };
};
// rotate model by mouse

export const setRotateModelByMouse = (payload) => {
  return {
    type: "SET_ROTATE_MODEL_BY_MOSUE",
    payload: payload,
  };
};

// rotate model automatically

export const setRotateModelAutomatically = (payload) => {
  return {
    type: "SET_ROTATE_MODEL_AUTOMATICALLY",
    payload: payload,
  };
};

// redirect to a website link

export const setRedirectTo = (payload) => {
  return {
    type: "REDIRECT_TO",
    payload: payload,
  };
};

// open link in an iframe

export const setOpenLinkInAniFrame = (payload) => {
  console.log("from button action creator");
  return {
    type: "OPEN_LINK_IN_AN_IFRAME",
    payload: payload,
  };
};

// set frame width

export const setFrameWidth = (payload) => {
  return {
    type: "SET_FRAME_WIDTH",
    payload: +payload,
  };
};

// set frame height

export const setFrameHeight = (payload) => {
  return {
    type: "SET_FRAME_HEIGHT",
    payload: +payload,
  };
};

// set frame position from left

export const setFramePositionLeft = (payload) => {
  return {
    type: "SET_FRAME_POSITION_LEFT",
    payload: +payload,
  };
};

// set frame position from right
export const setFramePositionTop = (payload) => {
  return {
    type: "SET_FRAME_POSITION_TOP",
    payload: +payload,
  };
};

// set audio playing delay in seconds

export const setAudioPlayingDelay = (payload) => {
  return {
    type: "AUDIO_PLAYING_DELAY",
    payload: payload,
  };
};

// set whether change background or not

export const setChangeBackground = (payload) => {
  return {
    type: "SET_CHANGE_BACKGROUND",
    payload: payload,
  };
};

// set no background or not

export const setNoBackground = (payload) => {
  return {
    type: "SET_NO_BACKGROUND",
    payload: payload,
  };
};

// set MODEL SCALE or not

export const setModelScale = (payload) => {
  return {
    type: "SET_SCALE_OF_MODEL",
    payload: payload,
  };
};

// set light color

export const setLightColor = (payload) => {
  return {
    type: "SET_LIGHT_COLOR",
    payload: payload,
  };
};

// set luminosity of light

export const setLuminosityLight = (payload) => {
  return {
    type: "SET_LUMINOSOTY_LIGHT",
    payload: payload,
  };
};

// set background color

export const setBackgroundColor = (payload) => {
  return {
    type: "SET_BACKGROUND_COLOR",
    payload: payload,
  };
};

// set play animation on click

export const setPlayAnimationInLoop = (payload) => {
  return {
    type: "SET_PLAY_ANIMATION_IN_LOOP",
    payload: payload,
  };
};

// set position from left

export const setPositionLeft = (payload) => {
  return {
    type: "SET_POSITION_LEFT",
    payload: payload,
  };
};

// set position from bottom

export const setPositionBottom = (payload) => {
  return {
    type: "SET_POSITION_BOTTOM",
    payload: payload,
  };
};
