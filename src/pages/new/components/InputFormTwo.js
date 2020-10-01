import React from 'react';

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

export default function InputFormTwo() {
    const classes = useStyle();
    // Defining state for switches
    const [switchState, setSwitchState] = React.useState({
        playGIFOnHover: false,
        playGIFOnClick: false,
    });
    const handleSwitchChange = (event) => {
        setSwitchState({
            ...switchState,
            [event.target.name]: event.target.checked,
        });
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
                                            Play GIF on Hover
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <OrangeSwitch
                                                checked={
                                                    switchState.playGIFOnHover
                                                }
                                                onChange={handleSwitchChange}
                                                name="playGIFOnHover"
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
                                            Play GIF on Click
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch
                                            checked={switchState.playGIFOnClick}
                                            onChange={handleSwitchChange}
                                            name="playGIFOnClick"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Third input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Scroll to Element ID on Click
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
                            {/* Fourt input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Button Hover Sound
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
                            {/* Fifth input */}
                            <Grid item xs={12} sm={6}>
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
                            {/* Sixth input */}
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
                                                    style={{ color: '#ffffff' }}
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
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
