import React from 'react';
import { connect } from 'react-redux';

import * as fileActionCreator from '../../../store/actions/file_actions';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import InputFormOne from './InputFormOne';
import InputFormTwo from './InputFormTwo';
import InputFormThree from './InputFormThree';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        background: '#014E58',
        paddingTop: '100px',
        paddingBottom: '100px',
    },
    button: {
        padding: '10px 0',
        color: '#ffffff',
        background: '#f44336',
        '&:hover': {
            background: '#d32f2f',
        },
    },
}));

function FormContainer(props) {
    const { uploadFile } = props;
    const { models, gifs, audios, hoverAudios } = props.file;
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <InputFormOne />
                    </Grid>
                    <Grid item xs={12}>
                        <InputFormTwo />
                    </Grid>
                    <Grid item xs={12}>
                        <InputFormThree />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size="large"
                            className={classes.button}
                            fullWidth={true}
                            onClick={() =>
                                uploadFile({
                                    model: models.fileValue,
                                    gif: gifs.fileValue,
                                    audio: audios.fileValue,
                                    hoverAudio: hoverAudios.fileValue,
                                })
                            }
                        >
                            Create Button
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

//mapping state to props
const mapStateToProps = (state) => {
    return {
        file: state.file,
    };
};

//mapping action to props
const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (data) => dispatch(fileActionCreator.uploadFile(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
