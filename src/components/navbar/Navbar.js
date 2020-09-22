import React from 'react';
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
    fontWeight: "500"
  },
  button: {
      fontFamily: "'Livvic', sans-serif",
      textTransform: "none",
      borderRadius: 25,
      marginLeft: "25px",
      padding: "5px 25px"

  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <MusicNoteIcon fontSize="large" />
          <Typography variant="h5" className={classes.title}>
            Sound Button
          </Typography>
          
          <Button size="medium" color="inherit" className={classes.button}>Buttons</Button>
          <Button size="medium" color="inherit" className={classes.button}>New</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}