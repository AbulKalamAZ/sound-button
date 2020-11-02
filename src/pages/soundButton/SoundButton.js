import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import DefaultLayout from '../../layouts/DefaultLayout';
import GIFRenderer from './components/GIFRenderer';

import { fetchButtonData } from '../../firebase/utility';
import ModelRenderer from './components/ModelRenderer';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        background: '#014E58',
    },
    modelContainer: {
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iframeContainer: {
        width: '100%',
        height: '100vh',
        position: 'relative',
    },
    downloadButton: {
        position: 'absolute',
        bottom: '120px',
        right: '60px',
    },
    audioElement: {
        display: 'none',
    },
}));

function SoundButton(props) {
    const classes = useStyle();
    const { match, history } = props;
    const { playAudio, showIFrame } = props.control;

    const audioElement = useRef(null);
    const frameContainer = useRef(null);

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
                console.log('Error form SoundButton.js ', err);
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

    // handle generating iframe

    useEffect(() => {
        if (showIFrame) generateIframe();
    }, [showIFrame]);

    // generate an iframe

    const generateIframe = () => {
        let frame;
        frame = document.createElement('iframe');
        frame.src = buttonInfo.redirectTo;
        frame.width = buttonInfo.frameWidth;
        frame.height = buttonInfo.frameHeight;
        frame.frameBorder = 0;
        frame.style.position = 'absolute';
        frame.style.top = `${buttonInfo.framePositionFromTop}px`;
        frame.style.left = `${buttonInfo.framePositionFromLeft}px`;
        frameContainer.current.appendChild(frame);
        if (showIFrame) {
            window.scrollTo(0, window.innerHeight);
        }
    };
    return (
        <DefaultLayout>
            <div className={classes.root}>
                <div className={classes.modelContainer}>
                    {Object.keys(buttonInfo).length === 0 ? (
                        <CircularProgress
                            size={80}
                            style={{ color: '#ffffff' }}
                        />
                    ) : buttonInfo.models ? (
                        <ModelRenderer buttonDetails={buttonInfo} />
                    ) : (
                        <GIFRenderer buttonInfo={buttonInfo} />
                    )}
                </div>

                {/* Container for iframe */}

                <div
                    ref={frameContainer}
                    className={showIFrame ? classes.iframeContainer : {}}
                >
                    {showIFrame ? (
                        <Link to="/frame.html" target="_blank" download>
                            <IconButton
                                className={classes.downloadButton}
                                aria-label="download iframe"
                                onClick={() => console.log('download it!!')}
                            >
                                <GetAppIcon
                                    fontSize="large"
                                    style={{ color: '#ffffff' }}
                                />
                            </IconButton>
                        </Link>
                    ) : null}
                </div>

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
