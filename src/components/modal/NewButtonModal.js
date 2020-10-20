import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import teal from '@material-ui/core/colors/teal';
import IconButton from '@material-ui/core/IconButton'
import BeenhereSharpIcon from '@material-ui/icons/BeenhereSharp';
import * as controlActionCreator from '../../store/actions/control_actions';

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        background: '#00695c',
        color: "#ffffff"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

    button: {
        textDecoration: 'none',
        color: '#ffffff',
        background: '#00695c',
        '&:hover': {
            background: '#004d40',
        },
    },
    link: {
        textDecoration: 'none',
        color: '#ffffff',
    },
    paper: {
        background: teal[50],
        color: teal[900],
        padding: theme.spacing(2),
    },
    progress: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function NewButtonModal(props) {
    const classes = useStyles();
    const { isFileUploadStarted, isModalOpen } = props.control;
    const { buttonId } = props.button;
    const { closeModal } = props;

    // Returns url
    const getURL = () => {
        return `${window.location.href.split('/')[0]}//${
            window.location.href.split('/')[2]
        }`;
    };

    return (
        <div>
            <Dialog
                className={classes.root}
                aria-labelledby="customized-dialog-title"
                open={isModalOpen}
            >
                {isFileUploadStarted ? (
                    <MuiDialogTitle disableTypography id="customized-dialog-title">
                        <Typography variant="h5">
                            Uploading files . .
                        </Typography>
                    </MuiDialogTitle>
                ) : (
                    <MuiDialogTitle disableTypography id="customized-dialog-title" className={classes.dialogTitle}>
                        <Typography variant="h5">
                            Your button is ready!
                        </Typography>
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={closeModal}
                        >
                            <BeenhereSharpIcon style={{color: '#ffffff', fontSize: 30}} />
                        </IconButton>
                    </MuiDialogTitle>
                )}
                <MuiDialogContent dividers style={{ margin: '0 auto' }}>
                    {isFileUploadStarted ? (
                        <Typography gutterBottom>
                            Please wait for a while, we'll get back to you when
                            we are done with uploading all the assests into the
                            server
                        </Typography>
                    ) : (
                        <Typography gutterBottom>
                            You can copy the code below to
                            emmbed the button into your site
                        </Typography>
                    )}

                    {isFileUploadStarted ? (
                        <div className={classes.progress}>
                            <CircularProgress size={80} style={{color: '#004d40'}} />
                        </div>
                    ) : (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Paper
                                    variant="outlined"
                                    className={classes.paper}
                                >
                                    <Typography>
                                        {`<iframe src="${getURL()}/button/${buttonId}" width="100%" height="300"></iframe>`}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </MuiDialogContent>
                <MuiDialogActions>
                    <Link to={`/button/${buttonId}`} className={classes.link}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            disabled={isFileUploadStarted}
                            component= 'span'
                            onClick={closeModal}
                        >
                            go to button
                        </Button>
                    </Link>
                </MuiDialogActions>
            </Dialog>
        </div>
    );
}

// Mapping state to props

const mapStateToProps = (state) => {
    return {
        control: state.control,
        button: state.button,
    };
};

// Mapping action to props

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(controlActionCreator.closeModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewButtonModal);
