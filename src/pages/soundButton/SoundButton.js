import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import DefaultLayout from '../../layouts/DefaultLayout';
import ModelRenderer from './components/ModelRenderer'
import GIFRenderer from './components/GIFRenderer'

import { fetchButtonData } from '../../firebase/utility';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        background: '#014E58',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

function SoundButton(props) {
    const classes = useStyle();
    const { match, history } = props;

    // Defining state
    const id = match.params.id;
    const [buttonInfo, setButtonInfo] = useState({});
    // Using effect
    useEffect(() => {
        fetchButtonData(id)
            .then((res) => {
                setButtonInfo({ ...res });
            })
            .catch((err) => {
                console.log(err);
                history.push('/create-button');
            });
    }, [id, history]);
    console.log(Object.keys(buttonInfo))

    return (
        <DefaultLayout>
            <div className={classes.root}>
                {Object.keys(buttonInfo).length === 0 ? <CircularProgress size={80} style={{color: '#ffffff'}} /> : buttonInfo.models ? (<ModelRenderer buttonInfo={buttonInfo} />) : (<GIFRenderer buttonInfo={buttonInfo} />) }
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
