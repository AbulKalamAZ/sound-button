import React, { useState } from 'react';
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
import TextField from '@material-ui/core/TextField';
import teal from '@material-ui/core/colors/teal';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import * as controlActionCreator from '../../store/actions/control_actions';

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        background: '#00695c',
        color: '#ffffff',
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

function OpeniFrameModal(props) {
    const classes = useStyles();

    // Destructuring props

    const { showFrameModal } = props.control;
    const { buttonId } = props.button;
    const { closeFrameModal } = props;

    // Defining state
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    const handleInputChange = (e) => {
        if (e.target.id === 'frame-width') {
            setWidth(e.target.value);
        } else {
            setHeight(e.target.value);
        }
    };

    return (
        <div>
            <Dialog
                className={classes.root}
                aria-labelledby="redirect-modal"
                open={showFrameModal}
                onBackdropClick={closeFrameModal}
            >
                <MuiDialogTitle
                    disableTypography
                    id="customized-dialog-title"
                    className={classes.dialogTitle}
                >
                    <Typography variant="h6">Do you want to leave ?</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                    >
                        <LaunchIcon
                            style={{ color: '#ffffff', fontSize: 30 }}
                        />
                    </IconButton>
                </MuiDialogTitle>

                <MuiDialogContent dividers style={{ margin: '0 auto' }}>
                    <Typography gutterBottom>
                        Please enter the value of following properties of your
                        iframe
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="frame-width"
                                label="Width"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="frame-height"
                                label="Height"
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                </MuiDialogContent>
                <MuiDialogActions>
                    <Link to={`/frame/${buttonId}`} className={classes.link}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            disabled={!width && !height}
                            component="span"
                            onClick={closeFrameModal}
                        >
                            Redirect
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
        closeFrameModal: () => dispatch(controlActionCreator.closeFrameModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpeniFrameModal);
