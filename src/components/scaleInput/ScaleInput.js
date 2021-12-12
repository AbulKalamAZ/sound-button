import React from "react";
import { connect } from "react-redux";
import * as buttonActionCreator from "../../store/actions/button_actions";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Typography } from "@material-ui/core";
import SwapVertIcon from "@material-ui/icons/SwapVert";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";

// Components root style

const OrangeTextField = withStyles({
  root: {
    "& fieldset": {
      borderRadius: 5,
      "&:hover": {
        borderColor: red[500],
      },
    },
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
  input: {
    borderRadius: 0,
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
}));

function ScaleInput(props) {
  // Creating styles
  const classes = useStyle();

  // handle scale slide on change

  const handleScaleSlider = (event) => {
    let value = event.target.value;

    parseFloat(value);

    if (!isNaN(parseFloat(value))) {
      props.setModelScale(event.target.value);
    } else {
      props.setModelScale(1);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>
            {props.componentLabel ?? "Component Label"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={9}>
              <OrangeTextField
                fullWidth
                type='text'
                className={classes.input}
                name='redirectTo'
                style={{ color: "#ffffff" }}
                autoComplete='off'
                onChange={handleScaleSlider}
                startAdornment={
                  <InputAdornment position='start'>
                    <IconButton>
                      <SwapVertIcon
                        fontSize='large'
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
    </div>
  );
}

// mapping action to props

const mapDispatchToProps = (dispatch) => {
  return {
    setModelScale: (data) => dispatch(buttonActionCreator.setModelScale(data)),
  };
};

export default connect(null, mapDispatchToProps)(ScaleInput);
