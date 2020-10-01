import React from 'react';

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

function InputFormOne(props) {
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
                                    componentLabel="Upload 3D Model"
                                    name="model3d"
                                    fileType=".obj, .gltf, .glb"
                                />
                            </Grid>
                            {/* Second input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Upload GIF"
                                    name="gif"
                                    fileType=".gif"
                                />
                            </Grid>
                            {/* Third input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Upload Button Sound"
                                    name="audio"
                                    fileType="audio/*"
                                />
                            </Grid>
                            {/* Fourt input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Upload Button Hover Sound"
                                    name="hoverAudio"
                                    fileType="audio/*"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default InputFormOne;
