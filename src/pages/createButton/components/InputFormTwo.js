import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import LinkIcon from '@material-ui/icons/Link';

import * as buttonActionCreator from '../../../store/actions/button_actions'

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        background: '#032E34',
        color: '#FEFEFC',
        padding: theme.spacing(5),
    },
    button: {
        color: '#ffffff',
        background: '#f44336',
        '&:hover': {
            background: '#d32f2f',
        },
    },
    input: {
        borderRadius: 0,
        borderWidth: '1px',
        borderColor: 'yellow !important',
    },
}));

// Custom Orange Switch
const OrangeSwitch = withStyles({
    switchBase: {
        color: red[400],
        '&$checked': {
            color: red[500],
        },
        '&$checked + $track': {
            backgroundColor: red[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

function InputFormTwo(props) {
    const { audios } = props.file;
    const { playAudioOnClick, playAudioAutomatically } = props.button;
    const { setPlayAudioOnClick, setPlayAudioAutomatically, setRedirectTo, setAudioPlayingDelay } = props;
    const classes = useStyle();
    
    const handleSwitchChange = (event) => {
        if(event.target.name === 'playAudioOnClick') {
            setPlayAudioOnClick(event.target.checked);
        } else if(event.target.name === 'playAudioAutomatically') {
            setPlayAudioAutomatically(event.target.checked);
        } else if(event.target.name === 'redirectTo') {
            setRedirectTo(event.target.value)
        } else {
            setAudioPlayingDelay(event.target.value)
        }
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={4}>
                            {/* First input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Play audio on click
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <OrangeSwitch
                                                checked={
                                                    playAudioOnClick
                                                }
                                                onChange={handleSwitchChange}
                                                name="playAudioOnClick"
                                                disabled={Object.keys(audios.fileValue).length === 0}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Second input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Play audio automatically
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch
                                            checked={playAudioAutomatically}
                                            onChange={handleSwitchChange}
                                            name="playAudioAutomatically"
                                            disabled={Object.keys(audios.fileValue).length === 0}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Third input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                             Redirect to (website link)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={9}>
                                                <OutlinedInput
                                                    fullWidth
                                                    type="text"
                                                    className={classes.input}
                                                    name="redirectTo"
                                                    style={{ color: '#ffffff' }}
                                                    autoComplete="off"
                                                    onChange={handleSwitchChange}
                                                    disabled={Object.keys(audios.fileValue).length === 0 ? true : playAudioOnClick}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <IconButton>
                                                                <LinkIcon
                                                                    style={{
                                                                        color:
                                                                            red[500],
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
                            </Grid>
                            {/* Fourth input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                             Audio playing delay (in seconds)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={9}>
                                                <OutlinedInput
                                                    fullWidth
                                                    type="text"
                                                    className={classes.input}
                                                    name="audioPlayingDelay"
                                                    style={{ color: '#ffffff' }}
                                                    autoComplete="off"
                                                    onChange={handleSwitchChange}
                                                    disabled={Object.keys(audios.fileValue).length === 0 ? true : playAudioOnClick}
                                                    
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Fifth input */}
                            {/* <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Sound Playing Delay (in seconds)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={9}>
                                                <OutlinedInput
                                                    fullWidth
                                                    type="text"
                                                    className={classes.input}
                                                    style={{ color: '#ffffff' }}
                                                    disabled={true}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <IconButton>
                                                                <LinkIcon
                                                                    style={{
                                                                        color:
                                                                            red[500],
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
                            </Grid> */}
                            {/* Sixth input */}
                            {/* <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Redirect to (website link)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={9}>
                                                <OutlinedInput
                                                    fullWidth
                                                    type="text"
                                                    className={classes.input}
                                                    style={{ color: '#ffffff' }}
                                                    disabled={true}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <IconButton>
                                                                <LinkIcon
                                                                    style={{
                                                                        color:
                                                                            red[500],
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
                            </Grid> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

//mapping state to props

const mapStateToProps = (state) => {
    return {
        file: state.file,
        button: state.button.button
    };
};


// MAPPING ACTION TO PROPS

const mapDispatchToProps = dispatch => {
    return {
        setPlayAudioAutomatically: (payload) => dispatch(buttonActionCreator.setPlayAudioAutomatically(payload)),
        setPlayAudioOnClick: (payload) => dispatch(buttonActionCreator.setPlayAudioOnClick(payload)),
        setRedirectTo: (payload) => dispatch(buttonActionCreator.setRedirectTo(payload)),
        setAudioPlayingDelay: (payload) => dispatch(buttonActionCreator.setAudioPlayingDelay(payload)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InputFormTwo);
