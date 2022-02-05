import React from "react";
import { connect } from "react-redux";

import FileUploader from "../../../components/fileUploader/FileUploader";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { Typography } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import LightBulb from "@material-ui/icons/WbIncandescent";

import * as buttonActionCreator from "../../../store/actions/button_actions";

const OrangeCheckbox = withStyles({
  root: {
    color: red[500],
    "&$checked": {
      color: red[500],
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

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

function InputFormFour(props) {
  const { models } = props.file;
  const { changeBackground, noBackground } = props.button;
  const { setChangeBackground, setNoBackground } = props;
  const classes = useStyle();

  // defining input change method

  const handleInputChange = ({ target }) => {
    if (target.name === "changeBackground") {
      setChangeBackground(target.checked);
    } else if (target.name === "noBackground") {
      setNoBackground(target.checked);
    }
  };

  const handleBackgroundColor = (event) => {
    let value = event.target.value;
    props.setBackgroundColor(value.toLowerCase());
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={4}>
              <Grid container item spacing={4}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <OrangeCheckbox
                        name='noBackground'
                        checked={noBackground}
                        disabled={!models.fileValue || changeBackground}
                        onChange={handleInputChange}
                        inputProps={{
                          "aria-label": "Input fields for no background",
                        }}
                      />
                    }
                    label="I don't want any default background cubemap"
                  />
                </Grid>

                {/* Change default background of cubemap */}
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <OrangeCheckbox
                        name='changeBackground'
                        checked={changeBackground}
                        disabled={!models.fileValue || noBackground}
                        onChange={handleInputChange}
                        inputProps={{
                          "aria-label": "Input fields for background cubemap",
                        }}
                      />
                    }
                    label='I want to change the default background cubemap of renderer'
                  />
                </Grid>

                {/* Background color */}
                {noBackground ? (
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='h6'>
                          Default Background color
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <OrangeTextField
                          fullWidth
                          type='text'
                          className={classes.input}
                          style={{ color: "#ffffff" }}
                          name='luminosityLight'
                          autoComplete='off'
                          onChange={handleBackgroundColor}
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
                ) : null}

                {/* Background image for scene */}

                {noBackground ? (
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Background Image for scene'
                      name='backgroundImageForScene'
                      fileType='image/*'
                      isDisabled={true}
                    />
                  </Grid>
                ) : null}
              </Grid>

              {/* Conditionally rendering input fields for background images */}
              {changeBackground ? (
                <Grid container item spacing={4}>
                  {/* First input */}
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Right (positive x-axis)'
                      name='posX'
                      fileType='image/*'
                      isDisabled={models.fileValue}
                    />
                  </Grid>
                  {/* Second input */}
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Left (negetive x-axis)'
                      name='negX'
                      fileType='image/*'
                      isDisabled={models.fileValue}
                    />
                  </Grid>
                  {/* Third input */}
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Top (positive y-axis)'
                      name='posY'
                      fileType='image/*'
                      isDisabled={models.fileValue}
                    />
                  </Grid>
                  {/* Fourth input */}
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Bottom (negetive y-axis)'
                      name='negY'
                      fileType='image/*'
                      isDisabled={models.fileValue}
                    />
                  </Grid>
                  {/* Sixth input */}
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Front (positive z-axis)'
                      name='posZ'
                      fileType='image/*'
                      isDisabled={models.fileValue}
                    />
                  </Grid>
                  {/* Sixth input */}
                  <Grid item xs={12} sm={6}>
                    <FileUploader
                      componentLabel='Back (negetive z-axis)'
                      name='negZ'
                      fileType='image/*'
                      isDisabled={models.fileValue}
                    />
                  </Grid>
                </Grid>
              ) : null}
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

// mapping dispatch to props

const mapDispatchToProps = (dispatch) => {
  return {
    setChangeBackground: (payload) => {
      dispatch(buttonActionCreator.setChangeBackground(payload));
    },
    setNoBackground: (payload) => {
      dispatch(buttonActionCreator.setNoBackground(payload));
    },
    setBackgroundColor: (payload) => {
      dispatch(buttonActionCreator.setBackgroundColor(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFormFour);
