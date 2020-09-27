import React from 'react'

import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Typography } from '@material-ui/core'


const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }, 
    paper: {
        background: "#032E34",
        color: '#FEFEFC',
        padding: theme.spacing(5)

    },
    button: {
        color: "#ffffff",
        background: '#f44336',
        '&:hover': {
            background: "#d32f2f"
        }
    },
    input: {
        display: 'none'
    }
}))

export default function InputFormOne() {

    const classes = useStyle();
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
                                            Button 3D Model
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={8}>
                                                <Button
                                                    variant="contained"
                                                    className={classes.button}
                                                    fullWidth={true}
                                                >
                                                    <CloudUploadIcon fontSize="large"/>
                                                </Button>
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
                                            Button GIF
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={8}>
                                                <Button
                                                    variant="contained"
                                                    className={classes.button}
                                                    fullWidth={true}
                                                >
                                                    <CloudUploadIcon fontSize="large"/>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Third input */}
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Button Sound
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={8}>
                                                <Button
                                                    variant="contained"
                                                    className={classes.button}
                                                    fullWidth={true}
                                                >
                                                    <CloudUploadIcon fontSize="large"/>
                                                </Button>
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
                                            <Grid item xs={8}>
                                                <Button
                                                    variant="contained"
                                                    className={classes.button}
                                                    fullWidth={true}
                                                >
                                                    <CloudUploadIcon fontSize="large"/>
                                                </Button>
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
    )
}
