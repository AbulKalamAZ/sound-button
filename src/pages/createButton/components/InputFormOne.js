import React from "react";
import { connect } from "react-redux";

import * as buttonActionCreator from "../../../store/actions/button_actions";

import FileUploader from "../../../components/fileUploader/FileUploader";
import ScaleInput from "../../../components/scaleInput/ScaleInput";
import ColorPickerTool from "../../../components/colorPicker/ColorPickerTool";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { red } from "@material-ui/core/colors";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ColorPicker from "@material-ui/icons/Colorize";
import LightBulb from "@material-ui/icons/WbIncandescent";
import { Typography } from "@material-ui/core";

import { getFileFormatName } from "../../../firebase/utility";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: "#032E34",
    color: "#FEFEFC",
    padding: theme.spacing(5),
  },
  button: {
    color: "#ffffff",
    background: "#f44336",
    "&:hover": {
      background: "#d32f2f",
    },
  },
}));

// Orange Input
const OrangeTextField = withStyles({
  root: {
    "& fieldset": {
      borderRadius: 5,
      "&:hover": {
        borderColor: red[500],
      },
    },
  },
  input: {
    display: "block !important",
    borderRadius: 0,
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
})((props) => <OutlinedInput {...props} />);

function InputFormOne(props) {
  // destructuing data from file props
  const { models, gifs, audios } = props.file;

  // creating classes
  const classes = useStyle();

  // defining state for variables
  const [fileFormatName, setFileFormatName] = React.useState(
    getFileFormatName(models?.fileValue?.fileName)
  );

  // defining side effect on comnponent
  React.useEffect(() => {
    setFileFormatName(getFileFormatName(models?.fileValue?.fileName));
  }, [models]);

  // Handle light Color

  const handleLightColor = (event) => {
    let value = event.target.value;
    props.setLightColor(value.toLowerCase());
  };

  // Handle luminosity of light

  const handleLuminosityLight = (event) => {
    let value = event.target.value;
    props.setLuminosityLight(parseFloat(value));
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={4}>
              {/* First input */}

              <Grid item xs={12} sm={6}>
                <FileUploader
                  componentLabel='Upload 3D Model'
                  name='models'
                  fileType='.obj, .glb, .fbx, .gltf'
                  isDisabled={!gifs.fileValue}
                />
              </Grid>

              {/* Second input */}

              <Grid item xs={12} sm={6}>
                {fileFormatName === "fbx" || fileFormatName === "gltf" ? (
                  <FileUploader
                    componentLabel='Upload Animation File'
                    name='animationFile'
                    fileType='.fbx'
                    isDisabled={audios.fileValue}
                  />
                ) : (
                  <FileUploader
                    componentLabel='Upload GIF'
                    name='gifs'
                    fileType='.gif'
                    isDisabled={!models.fileValue}
                  />
                )}
              </Grid>

              {/* Third input */}

              <Grid item xs={12} sm={6}>
                <FileUploader
                  componentLabel='Upload Button Sound'
                  name='audios'
                  fileType='audio/*'
                  isDisabled={audios.fileValue}
                />
              </Grid>

              {/* Fourth input */}

              <Grid item xs={12} sm={6}>
                <ScaleInput
                  componentLabel='Input the scale of model'
                  name='scale'
                />
              </Grid>

              {/* Fifth input */}

              <Grid item xs={12} sm={6}>
                <ColorPickerTool />
              </Grid>

              {/* Sixth input */}

              <Grid item xs={12} sm={5}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Put color</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <OrangeTextField
                      fullWidth
                      type='text'
                      className={classes.input}
                      name='lightColor'
                      style={{ color: "#ffffff" }}
                      autoComplete='off'
                      onChange={handleLightColor}
                      startAdornment={
                        <InputAdornment position='start'>
                          <IconButton>
                            <ColorPicker
                              fontSize='default'
                              style={{
                                color: red[500],
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Seventh input */}

              <Grid item xs={12} sm={5}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Luminosity of light</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <OrangeTextField
                      fullWidth
                      type='text'
                      className={classes.input}
                      style={{ color: "#ffffff" }}
                      name='luminosityLight'
                      autoComplete='off'
                      onChange={handleLuminosityLight}
                      startAdornment={
                        <InputAdornment position='start'>
                          <IconButton>
                            <LightBulb
                              fontSize='default'
                              style={{
                                color: red[500],
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// mapping state to props

const mapStateToProps = (state) => {
  return {
    file: state.file,
    button: state.button.button,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLightColor: (data) => dispatch(buttonActionCreator.setLightColor(data)),
    setLuminosityLight: (data) =>
      dispatch(buttonActionCreator.setLuminosityLight(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFormOne);
