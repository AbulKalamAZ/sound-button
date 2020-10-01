import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Typography } from '@material-ui/core';

// Components root style
const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

function FileUploader(props) {
    // Defining component state
    const [fileName, setFileName] = useState('No file choosen');
    // Creating classes object
    const classes = useStyle();

    //handling file input changes
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {props.componentLabel ?? 'Component Label'}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <input
                                accept={props.fileType}
                                className={classes.input}
                                name={props.name}
                                id={props.name}
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor={props.name}>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    fullWidth={true}
                                    component="span"
                                >
                                    <CloudUploadIcon fontSize="large" />
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography
                                variant="subtitle1"
                                style={{
                                    marginTop: '10px',
                                }}
                            >
                                {fileName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

// mapping state to props
const mapStateToProps = (state) => {
    return {
        fileName: state.fileName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFileName: (payload) =>
            dispatch({ type: 'UPDATE_FILE_NAME', payload: payload }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
