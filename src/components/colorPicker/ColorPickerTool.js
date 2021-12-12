import React from "react";
import { connect } from "react-redux";
import * as buttonActionCreator from "../../store/actions/button_actions";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LightBulb from "@material-ui/icons/WbIncandescent";
import { Typography } from "@material-ui/core";

import ColorPicker from "material-ui-color-picker";

// Components root style
const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: "#ffffff",
    background: "#f44336",
    "&:hover": {
      background: "#d32f2f",
    },
  },
}));

function ColorPickerTool(props) {
  // Creating classes object
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Choose color</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <label htmlFor='colorPicker'>
                <Button
                  variant='contained'
                  className={classes.button}
                  fullWidth={true}
                  component='span'
                >
                  <LightBulb fontSize='large' />
                </Button>
              </label>
            </Grid>
            <Grid item xs={9}>
              <ColorPicker
                style={{ visibility: "none" }}
                name='colorPicker'
                id='colorPicker'
                defaultValue='#ffffff'
                onChange={(color) => console.log(color)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLightColor: (data) => dispatch(buttonActionCreator.setLightColor(data)),
  };
};

export default connect(null, mapDispatchToProps)(ColorPickerTool);
