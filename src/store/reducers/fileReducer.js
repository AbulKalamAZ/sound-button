// Initial state of this reducer
const initState = {
  models: {
    defaultFileName: "No 3D model choosen",
    fileValue: null,
  },
  animationFile: {
    defaultFileName: "No Animation File Choosen",
    fileValue: null,
  },
  gifs: {
    defaultFileName: "No gif choosen",
    fileValue: null,
  },
  audios: {
    defaultFileName: "No audio choosen",
    fileValue: {},
  },
  images: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  backgroundImageForScene: {
    defaultFileName: "No image choosen for background",
    fileValue: {},
  },
  posX: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  negX: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  posY: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  negY: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  posZ: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  negZ: {
    defaultFileName: "No image choosen",
    fileValue: {},
  },
  lightColor: "ffffff",
};

const fileReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_FILE_NAME":
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name],
          defaultFileName: payload.fileName,
        },
      };

    case "LOAD_FILE":
      console.log(payload);
      return {
        ...state,
        [payload.name]: {
          ...state[payload.name],
          fileValue: Object.assign({}, payload),
        },
      };

    case "UNLOAD_FILE":
      return {
        ...state,
        models: {
          ...state.models,
          defaultFileName: "No File Choosen",
          fileValue: null,
        },
        gifs: {
          ...state.gifs,
          defaultFileName: "No File Choosen",
          fileValue: null,
        },
        audios: {
          ...state.audios,
          defaultFileName: "No File Choosen",
          fileValue: {},
        },
        images: {
          ...state.images,
          defaultFileName: "No File Choosen",
          fileValue: {},
        },
        backgroundImageForScene: {
          ...state.backgroundImageForScene,
          defaultFileName: "No File Choosen",
          fileValue: {},
        },
      };

    case "FILE_UPLOAD_START":
      return { ...state };

    case "FILE_UPLOAD_SUCCESS":
      return { ...state };

    case "FILE_UPLOAD_ERROR":
      return { ...state };

    case "SET_LIGHT_COLOR":
      return { ...state, lightColor: payload };

    default:
      return { ...state };
  }
};

export default fileReducer;
