import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import DefaultLayout from '../../layouts/DefaultLayout';
import Button from './components/Button';

import { fetchButtonData } from '../../firebase/utility';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        background: '#014E58',
        paddingTop: '100px',
        paddingBottom: '100px',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonGIF: {
        width: '100%',
        height: 'auto',
    },
}));

function SoundButton(props) {
    const classes = useStyle();
    const { match } = props;

    // Defining state
    const [id, setId] = useState(match.params.id);
    const [buttonInfo, setButtonInfo] = useState({});
    // Using effect
    useEffect(() => {
        fetchButtonData(id).then((res) => {
            console.log(res);
            setButtonInfo({ ...res });
        });
    }, []);

    return (
        <DefaultLayout>
            <div className={classes.root}>
                <Container fixed className={classes.container}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={6}>
                            <Button>
                                {buttonInfo.gifs && (
                                    <img
                                        className={classes.buttonGIF}
                                        src={buttonInfo.gifs}
                                        alt="Button media"
                                    />
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </DefaultLayout>
    );
}

// Mapping global state to it's props

const mapStateToProps = (state) => {
    return {
        button: state.button,
    };
};

export default withRouter(connect(mapStateToProps, null)(SoundButton));
