import React from 'react';
import { connect } from 'react-redux';
import * as controlActionCreator from '../../store/actions/control_actions';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

    paper: {
        background: indigo[50],
        color: indigo[900],
        padding: theme.spacing(2),
    },
    progress: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function AnotherModal(props) {
    const classes = useStyles();
    const { isFileUploadStarted, openModal } = props.control;
    const { closeModal } = props;
    return (
        <div className={classes.root}>
            <Dialog aria-labelledby="customized-dialog-title" open={openModal}>
                <MuiDialogTitle disableTypography id="customized-dialog-title">
                    <Typography variant="h5">
                        {isFileUploadStarted
                            ? 'Button is being created . .'
                            : 'Button is created !!'}
                    </Typography>
                    {!isFileUploadStarted && (
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={props.closeModal}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </MuiDialogTitle>

                <MuiDialogContent></MuiDialogContent>
                <MuiDialogActions></MuiDialogActions>
            </Dialog>
        </div>
    );
}

// Mapping state to props

const mapStateToProps = (state) => {
    return {
        control: state.control,
    };
};

// Mapping actions to props

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(controlActionCreator.closeModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnotherModal);
