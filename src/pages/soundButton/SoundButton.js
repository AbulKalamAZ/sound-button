import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import DefaultLayout from '../../layouts/DefaultLayout';
import GIFRenderer from './components/GIFRenderer';

import { fetchButtonData } from '../../firebase/utility';
import ModelRenderer from './components/ModelRenderer';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        background: '#014E58',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioElement: {
        display: 'none',
    },
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
        console.log(id);
        fetchButtonData(id)
            .then((res) => {
                console.log(res);
                setButtonInfo({ ...res });
            })
            .catch((err) => {
                console.log(err);
                history.push('/create-button');
            });
    }, [id, history]);

    // handle audio
    useEffect(() => {
        const {
            audios,
            playAudioOnClick,
            playAudioAutomatically,
            audioPlayingDelay,
        } = buttonInfo;

        if (audios) {
            // Initiating audio olayer
            const player = audioElement.current;

            // Check auto play

            if (playAudioOnClick) {
                if (playAudio) {
                    player.play();
                } else {
                    player.pause();
                }
            } else if (playAudioAutomatically) {
                // Check if delay
                if (audioPlayingDelay) {
                    setTimeout(() => {
                        player.play();
                    }, audioPlayingDelay * 1000);
                } else {
                    player.play();
                }
            }
        }
    }, [
        playAudio,
        buttonInfo,
        buttonInfo.audios,
        buttonInfo.playAudioOnClick,
        buttonInfo.playAudioAutomatically,
        buttonInfo.audioPlayingDelay,
    ]);

    return (
        <DefaultLayout>
            <div className={classes.root}>
                {Object.keys(buttonInfo).length === 0 ? (
                    <CircularProgress size={80} style={{ color: '#ffffff' }} />
                ) : buttonInfo.models ? (
                    <ModelRenderer buttonDetails={buttonInfo} />
                ) : (
                    <GIFRenderer buttonInfo={buttonInfo} />
                )}

                {buttonInfo.audios ? (
                    <audio
                        ref={audioElement}
                        className={classes.audioElement}
                        src={buttonInfo.audios}
                        loop
                    ></audio>
                ) : null}
            </div>
        </DefaultLayout>
    );
}

// Mapping global state to it's props

const mapStateToProps = (state) => {
    return {
        button: state.button,
        control: state.control,
    };
};

export default withRouter(connect(mapStateToProps, null)(SoundButton));
