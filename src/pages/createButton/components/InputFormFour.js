import React, { useState } from 'react';
import { connect } from 'react-redux';

import FileUploader from '../../../components/fileUploader/FileUploader';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const OrangeCheckbox = withStyles({
    root: {
        color: red[500],
        '&$checked': {
            color: red[500],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    const { models } = props.file;
    const classes = useStyle();
    const [showBackgroundImageFields, setShowBackgroundImageFields] = useState(
        false
    );

    // Handle show background image fields
    const handleShowBackgroundImageField = (e) => {
        setShowBackgroundImageFields(e.target.checked);
    };
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={4}>
                            <Grid container item>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <OrangeCheckbox
                                                checked={
                                                    showBackgroundImageFields
                                                }
                                                disabled={!models.fileValue}
                                                onChange={
                                                    handleShowBackgroundImageField
                                                }
                                                inputProps={{
                                                    'aria-label':
                                                        'Input fields for background cubemap',
                                                }}
                                            />
                                        }
                                        label="I want to change the default background cubemap of renderer"
                                    />
                                </Grid>
                            </Grid>

                            {/* Conditionally rendering input fields for background images */}
                            {showBackgroundImageFields ? (
                                <Grid container item spacing={4}>
                                    {/* First input */}
                                    <Grid item xs={12} sm={6}>
                                        <FileUploader
                                            componentLabel="Right (positive x-axis)"
                                            name="posX"
                                            fileType="image/*"
                                            isDisabled={models.fileValue}
                                        />
                                    </Grid>
                                    {/* Second input */}
                                    <Grid item xs={12} sm={6}>
                                        <FileUploader
                                            componentLabel="Left (negetive x-axis)"
                                            name="negX"
                                            fileType="image/*"
                                            isDisabled={models.fileValue}
                                        />
                                    </Grid>
                                    {/* Third input */}
                                    <Grid item xs={12} sm={6}>
                                        <FileUploader
                                            componentLabel="Top (positive y-axis)"
                                            name="posY"
                                            fileType="image/*"
                                            isDisabled={models.fileValue}
                                        />
                                    </Grid>
                                    {/* Fourth input */}
                                    <Grid item xs={12} sm={6}>
                                        <FileUploader
                                            componentLabel="Bottom (negetive y-axis)"
                                            name="negY"
                                            fileType="image/*"
                                            isDisabled={models.fileValue}
                                        />
                                    </Grid>
                                    {/* Sixth input */}
                                    <Grid item xs={12} sm={6}>
                                        <FileUploader
                                            componentLabel="Front (positive z-axis)"
                                            name="posZ"
                                            fileType="image/*"
                                            isDisabled={models.fileValue}
                                        />
                                    </Grid>
                                    {/* Sixth input */}
                                    <Grid item xs={12} sm={6}>
                                        <FileUploader
                                            componentLabel="Back (negetive z-axis)"
                                            name="negZ"
                                            fileType="image/*"
                                            isDisabled={models.fileValue}
                                        />
                                    </Grid>
                                </Grid>
                            ) : null}
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
