import React from 'react';
import { connect } from 'react-redux';

import FileUploader from '../../../components/fileUploader/FileUploader';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        display: 'none',
    },
}));

function InputFormFour(props) {
    const { models, gifs, audios, images } = props.file;
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={4}>
                            {/* First input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Positive x-axis"
                                    name="posX"
                                    fileType="image/*"
                                    isDisabled={models.fileValue}
                                />
                            </Grid>
                            {/* Second input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Negetive x-axis"
                                    name="negX"
                                    fileType="image/*"
                                    isDisabled={models.fileValue}
                                />
                            </Grid>
                            {/* Third input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Positive y-axis"
                                    name="posY"
                                    fileType="image/*"
                                    isDisabled={models.fileValue}
                                />
                            </Grid>
                            {/* Fourth input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Negetive y-axis"
                                    name="negY"
                                    fileType="image/*"
                                    isDisabled={models.fileValue}
                                />
                            </Grid>
                            {/* Sixth input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Positive z-axis"
                                    name="posZ"
                                    fileType="image/*"
                                    isDisabled={models.fileValue}
                                />
                            </Grid>
                            {/* Sixth input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Negetive z-axis"
                                    name="negZ"
                                    fileType="image/*"
                                    isDisabled={models.fileValue}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

// mapping state to props

const mapStateToProps = (state) => {
    return {
        file: state.file,
    };
};

export default connect(mapStateToProps, null)(InputFormFour);
