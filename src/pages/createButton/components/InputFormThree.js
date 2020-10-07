import React from 'react'

import {makeStyles, withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import { Typography } from '@material-ui/core'
import { red } from '@material-ui/core/colors'



const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    paper: {
        background: "#032E34",
        color: '#FEFEFC',
        padding: theme.spacing(5)

    }
}))

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

export default function InputFormThree() {
    const classes = useStyle();
    // Defining state for switches
    const [switchState, setSwitchState] = React.useState({
        makeBtnDrag: false,
        setShutterBtn: false,
        makeBtnMove: false,
        growEftBtn: false,
        glowEftBtn: false,
    });
    const handleSwitchChange = (event) => {
        setSwitchState({...switchState, [event.target.name]: event.target.checked})
    } 
    
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
                                            Make Button Draggable
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <OrangeSwitch checked={switchState.makeBtnDrag} onChange={handleSwitchChange}  name="makeBtnDrag" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Second input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Set Shutter Effect on Button
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch checked={switchState.setShutterBtn}  onChange={handleSwitchChange} name="setShutterBtn" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Third input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Make Button Moveable
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch checked={switchState.makeBtnMove} onChange={handleSwitchChange}  name="makeBtnMove" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Fourt input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Set Grow Effect on Button
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch checked={switchState.growEftBtn} onChange={handleSwitchChange}  name="growEftBtn" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Fifth input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Set Glow Effect on Button
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OrangeSwitch checked={switchState.glowEftBtn} onChange={handleSwitchChange}  name="glowEftBtn" />
                                    </Grid>
                                </Grid>
                            </Grid>
                
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
