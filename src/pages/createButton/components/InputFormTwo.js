import React from 'react';
import { connect } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import * as buttonActionCreator from '../../../store/actions/button_actions';

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
    const { audios, models } = props.file;
    const {
        playAudioOnClick,
        playAudioAutomatically,
        playAudioOnce,
        playAudioInLoop,
        rotateModelByMouse,
        rotateModelAutomatically,
    } = props.button;
    const {
        setPlayAudioOnClick,
        setPlayAudioAutomatically,
        setPlayAudioOnce,
        setPlayAudioInLoop,
        setAudioPlayingDelay,
        setRotateModelByMouse,
        setRotateModelAutomatically,
    } = props;
    const classes = useStyle();

    const handleSwitchChange = (event) => {
        switch (event.target.name) {
            case 'playAudioOnClick':
                setPlayAudioOnClick(event.target.checked);
                break;

            case 'playAudioAutomatically':
                setPlayAudioAutomatically(event.target.checked);
                break;

            case 'playAudioOnce':
                setPlayAudioOnce(event.target.checked);
                break;

            case 'playAudioInLoop':
                setPlayAudioInLoop(event.target.checked);
                break;

            case 'rotateModelByMouse':
                setRotateModelByMouse(event.target.checked);
                break;

            case 'rotateModelAutomatically':
                setRotateModelAutomatically(event.target.checked);
                break;

            default:
                setAudioPlayingDelay(event.target.value);
                break;
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
                                            Rotate model by mouse
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <OrangeSwitch
                                                checked={rotateModelByMouse}
                                                onChange={handleSwitchChange}
                                                name="rotateModelByMouse"
                                                disabled={
                                                    models.fileValue === null
                                                }
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
                                            Rotate model automatically
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch
                                            checked={rotateModelAutomatically}
                                            onChange={handleSwitchChange}
                                            name="rotateModelAutomatically"
                                            disabled={models.fileValue === null}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Third input */}
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
                                                checked={playAudioOnClick}
                                                onChange={handleSwitchChange}
                                                name="playAudioOnClick"
                                                disabled={
                                                    Object.keys(
                                                        audios.fileValue
                                                    ).length === 0
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Fourth input */}
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
                                            disabled={
                                                Object.keys(audios.fileValue)
                                                    .length === 0
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Fifth input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Play audio once
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch
                                            checked={playAudioOnce}
                                            onChange={handleSwitchChange}
                                            name="playAudioOnce"
                                            disabled={
                                                Object.keys(audios.fileValue)
                                                    .length === 0
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Sixth input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Play audio in loop
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch
                                            checked={playAudioInLoop}
                                            onChange={handleSwitchChange}
                                            name="playAudioInLoop"
                                            disabled={
                                                Object.keys(audios.fileValue)
                                                    .length === 0
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

//mapping state to props

const mapStateToProps = (state) => {
    return {
        file: state.file,
        button: state.button.button,
        control: state.control,
    };
};

// MAPPING ACTION TO PROPS

const mapDispatchToProps = (dispatch) => {
    return {
        setPlayAudioOnClick: (payload) =>
            dispatch(buttonActionCreator.setPlayAudioOnClick(payload)),
        setPlayAudioAutomatically: (payload) =>
            dispatch(buttonActionCreator.setPlayAudioAutomatically(payload)),
        setPlayAudioOnce: (payload) =>
            dispatch(buttonActionCreator.setPlayAudioOnce(payload)),
        setPlayAudioInLoop: (payload) =>
            dispatch(buttonActionCreator.setPlayAudioInLoop(payload)),
        setRotateModelByMouse: (payload) =>
            dispatch(buttonActionCreator.setRotateModelByMouse(payload)),
        setRotateModelAutomatically: (payload) =>
            dispatch(buttonActionCreator.setRotateModelAutomatically(payload)),
        setRedirectTo: (payload) =>
            dispatch(buttonActionCreator.setRedirectTo(payload)),
        setAudioPlayingDelay: (payload) =>
            dispatch(buttonActionCreator.setAudioPlayingDelay(payload)),
        setFrameWidth: (payload) =>
            dispatch(buttonActionCreator.setFrameWidth(payload)),
        setFrameHeight: (payload) =>
            dispatch(buttonActionCreator.setFrameHeight(payload)),
        setFramePositionLeft: (payload) =>
            dispatch(buttonActionCreator.setFramePositionLeft(payload)),
        setFramePositionTop: (payload) =>
            dispatch(buttonActionCreator.setFramePositionTop(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputFormTwo);
