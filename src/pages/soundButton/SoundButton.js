import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import DefaultLayout from '../../layouts/DefaultLayout';
import OBJRenderer from './components/OBJRenderer'
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
    audioElement: {
        display: 'none'
    }
}));

function SoundButton(props) {
    const classes = useStyle();
    const { match, history } = props;
    const { playAudio } = props.control;

    const audioElement = useRef(null);
    

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
    

    // handle audio
    useEffect(() => {
        const player = audioElement.current;
        

        if(!playAudio) {

            if(buttonInfo.audios) {
                player.pause();
            }

        } else {

            if(buttonInfo.audios) {
                player.play();
            }

        }
    }, [playAudio, buttonInfo.audios])

    
    

    return (
        <DefaultLayout>
            <div className={classes.root}>
                {Object.keys(buttonInfo).length === 0 ? <CircularProgress size={80} style={{color: '#ffffff'}} /> : buttonInfo.models ? (<OBJRenderer buttonInfo={buttonInfo} />) : (<GIFRenderer buttonInfo={buttonInfo} />) }
                <audio className={classes.audioElement} ref={audioElement} src={buttonInfo.audios ?? null} loop></audio>
            </div>
        </DefaultLayout>
    );
}

// Mapping global state to it's props

const mapStateToProps = (state) => {
    return {
        button: state.button,
        control: state.control
    };
};



export default withRouter(connect(mapStateToProps, null)(SoundButton));
