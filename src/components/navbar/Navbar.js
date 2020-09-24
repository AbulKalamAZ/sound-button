import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#014E58",
    padding: "0 50px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "'Livvic', sans-serif",
    fontWeight: "500",
    cursor: "pointer",
  },
  button: {
      fontFamily: "'Livvic', sans-serif",
      textTransform: "none",
      borderRadius: 25,
      marginLeft: "25px",
      padding: "5px 25px",
      textDecoration: "none",
      color: "#ffffff"
  },

  link: {
    textDecoration: "none",
    color: "#FEFEFC"
  }

}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Link className={classes.link} to="/">
              <MusicNoteIcon fontSize="large" />
            </Link>
            
            <Typography variant="h5" className={classes.title}>
              <Link className={classes.link} to="/">
                Sound Button
              </Link>
            </Typography>
            
            <Link className={classes.link} to="/buttons">
              <Button size="medium" color="inherit" className={classes.button}>Buttons</Button>
            </Link>
            
            <Link className={classes.link} to="/new-button">
              <Button size="medium" color="inherit" className={classes.button}>New</Button>
            </Link>
          </Toolbar>
      </AppBar>
    </div>
  );
}