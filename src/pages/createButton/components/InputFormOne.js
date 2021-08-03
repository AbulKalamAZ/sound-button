import React from 'react';
import { connect } from 'react-redux';

import FileUploader from '../../../components/fileUploader/FileUploader';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { getFileFormatName } from '../../../firebase/utility';

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
    // destructuing data from file props
    const { models, gifs, audios } = props.file;

    // creating classes
    const classes = useStyle();

    // defining state for variables
    const [fileFormatName, setFileFormatName] = React.useState(
        getFileFormatName(models?.fileValue?.fileName)
    );

    // defining side effect on comnponent
    React.useEffect(() => {
        setFileFormatName(getFileFormatName(models?.fileValue?.fileName));
    }, [models]);

    console.log('model name', fileFormatName);
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
                                    name="models"
                                    fileType=".obj, .glb, .fbx"
                                    isDisabled={!gifs.fileValue}
                                />
                            </Grid>
                            {/* Second input */}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Upload GIF"
                                    name="gifs"
                                    fileType=".gif"
                                    isDisabled={!models.fileValue}
                                />
                            </Grid>
                            {/* Third input */}
                            {/* <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Upload Background Image"
                                    name="images"
                                    fileType="image/*"
                                    isDisabled={images.fileValue}
                                />
                            </Grid> */}
                            {/* Fourt input */}

                            {fileFormatName ? (
                                <Grid item xs={12} sm={6}>
                                    <FileUploader
                                        componentLabel="Upload Animation File"
                                        name="animationFile"
                                        fileType=".fbx"
                                        isDisabled={audios.fileValue}
                                    />
                                </Grid>
                            ) : null}
                            <Grid item xs={12} sm={6}>
                                <FileUploader
                                    componentLabel="Upload Button Sound"
                                    name="audios"
                                    fileType="audio/*"
                                    isDisabled={audios.fileValue}
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
        button: state.button.button,
    };
};

export default connect(mapStateToProps, null)(InputFormOne);
