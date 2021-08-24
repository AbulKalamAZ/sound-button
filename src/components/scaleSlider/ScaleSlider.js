import React from 'react';
import { connect } from 'react-redux';
import * as buttonActionCreator from '../../store/actions/button_actions';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Components root style
const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    color: '#ffffff',
    background: '#f44336',
    '&:hover': {
      background: '#d32f2f',
    },
  },
  input: {
    display: 'none',
  },
}));

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: '#f44336',
      },
      track: {
        color: '#f44336',
      },
      rail: {
        color: 'white',
      },
    },
  },
});

function ScaleSlider(props) {
  // Creating classes object
  const classes = useStyle();

  // handle scale slide on change

  const handleScaleSlider = (event, value) => {
    props.setModelScale(value);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              {props.componentLabel ?? 'Component Label'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <SwapVertIcon fontSize='large' style={{ color: '#f44336' }} />
              </Grid>
              <Grid item xs={8}>
                <Slider
                  defaultValue={1}
                  aria-labelledby='discrete-slider'
                  valueLabelDisplay='auto'
                  step={0.5}
                  marks
                  min={1}
                  max={10}
                  onChangeCommitted={handleScaleSlider}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

// mapping action to props

const mapDispatchToProps = (dispatch) => {
  return {
    setModelScale: (data) => dispatch(buttonActionCreator.setModelScale(data)),
  };
};

export default connect(null, mapDispatchToProps)(ScaleSlider);
