import React from 'react';
import { connect } from 'react-redux';
import * as fileActionCreator from '../../store/actions/file_actions';

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
    // Creating classes object
    const classes = useStyle();

    //handling file input changes
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            // setFileName(e.target.files[0].name);
            props.changeFileName({
                name: e.target.name,
                value: e.target.files[0],
                fileName: e.target.files[0].name,
            });
            props.loadFile({
                name: e.target.name,
                value: e.target.files[0],
                fileName: e.target.files[0].name,
            });
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
                                disabled={!props.isDisabled}
                            />
                            <label htmlFor={props.name}>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    fullWidth={true}
                                    component="span"
                                    disabled={!props.isDisabled}
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
                                {props.file[props.name].defaultFileName}
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
        file: state.file,
        button: state.button,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadFile: (data) => dispatch(fileActionCreator.loadFile(data)),
        changeFileName: (data) =>
            dispatch(fileActionCreator.changeFileName(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
