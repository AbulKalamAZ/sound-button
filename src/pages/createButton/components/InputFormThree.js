import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControlLabel, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import LinkIcon from '@material-ui/icons/Link';

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

const OrangeCheckbox = withStyles({
    root: {
        color: red[500],
        '&$checked': {
            color: red[500],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

function InputFormThree(props) {
    // Extrackting required data from props
    const {
        setRedirectTo,
        setAudioPlayingDelay,
        setFrameWidth,
        setFrameHeight,
        setFramePositionLeft,
        setFramePositionTop,
    } = props;
    const { audios, models } = props.file;
    const { redirectTo } = props.button;
    const { playAudioOnClick } = props.button;

    // Creating style
    const classes = useStyle();

    // Definign state
    const [openWebpageInAnIFrame, setOpenWebpageInAnIFrame] = useState(false);

    // Handle input field for iframe
    const handleOpenWebpageInAnIFrame = (e) => {
        setOpenWebpageInAnIFrame(e.target.checked);
    };

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case 'redirectTo':
                setRedirectTo(event.target.value);
                break;

            case 'frameWidth':
                setFrameWidth(event.target.value);
                break;

            case 'frameHeight':
                setFrameHeight(event.target.value);
                break;

            case 'framePositionFromLeft':
                setFramePositionLeft(event.target.value);
                break;

            case 'framePositionFromTop':
                setFramePositionTop(event.target.value);
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
                                                    onChange={handleInputChange}
                                                    disabled={
                                                        models.fileValue ===
                                                        null
                                                    }
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

                            {/* Second input */}
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
                                                    onChange={handleInputChange}
                                                    disabled={
                                                        Object.keys(
                                                            audios.fileValue
                                                        ).length === 0
                                                            ? true
                                                            : playAudioOnClick
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <OrangeCheckbox
                                            checked={openWebpageInAnIFrame}
                                            disabled={models.fileValue === null}
                                            onChange={
                                                handleOpenWebpageInAnIFrame
                                            }
                                            inputProps={{
                                                'aria-label':
                                                    'Input fields whether webpage open in an iframe or not ',
                                            }}
                                        />
                                    }
                                    label="I want to open the webpage in an iframe"
                                />
                            </Grid>

                            {/* Third input */}
                            {openWebpageInAnIFrame ? (
                                <Grid container item>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">
                                                    iFrame's width
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} sm={9}>
                                                        <OutlinedInput
                                                            fullWidth
                                                            type="text"
                                                            name="frameWidth"
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={
                                                                classes.input
                                                            }
                                                            style={{
                                                                color:
                                                                    '#ffffff',
                                                            }}
                                                            autoComplete="off"
                                                            disabled={
                                                                !redirectTo
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">
                                                    iFrame's height
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} sm={9}>
                                                        <OutlinedInput
                                                            fullWidth
                                                            type="text"
                                                            name="frameHeight"
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={
                                                                classes.input
                                                            }
                                                            style={{
                                                                color:
                                                                    '#ffffff',
                                                            }}
                                                            autoComplete="off"
                                                            disabled={
                                                                !redirectTo
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">
                                                    iFrame's position (form
                                                    left)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} sm={9}>
                                                        <OutlinedInput
                                                            fullWidth
                                                            type="text"
                                                            name="framePositionFromLeft"
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={
                                                                classes.input
                                                            }
                                                            style={{
                                                                color:
                                                                    '#ffffff',
                                                            }}
                                                            autoComplete="off"
                                                            disabled={
                                                                !redirectTo
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">
                                                    iFrame's psoition (form top)
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12} sm={9}>
                                                        <OutlinedInput
                                                            fullWidth
                                                            type="text"
                                                            name="framePositionFromTop"
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className={
                                                                classes.input
                                                            }
                                                            style={{
                                                                color:
                                                                    '#ffffff',
                                                            }}
                                                            autoComplete="off"
                                                            disabled={
                                                                !redirectTo
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(InputFormThree);
