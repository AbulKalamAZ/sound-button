import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// import DefaultLayout from '../../layouts/DefaultLayout';
import GIFRenderer from './components/GIFRenderer';

import { fetchButtonData } from '../../firebase/utility';
import ModelRenderer from './components/ModelRenderer';

import frameShell from '../../firebase/frameShell.js';
import { saveAs } from 'file-saver';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
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
    backButton: {
        position: 'absolute',
        top: '30px',
        left: '30px',
        transform: 'rotateY(180deg)',
        zIndex: '9999',
    },
    downloadButton: {
        position: 'absolute',
        bottom: '60px',
        right: '60px',
    },
    audioElement: {
        display: 'none',
    },
}));

function SoundButton(props) {
    const classes = useStyle();
    const { match, history } = props;
    const { showIframe } = props.control;

    // const audioElement = useRef(null);
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
    // useEffect(() => {
    //     const {
    //         audios,
    //         playAudioOnClick,
    //         playAudioAutomatically,
    //         audioPlayingDelay,
    //     } = buttonInfo;

    //     if (audios) {
    //         // Initiating audio olayer
    //         const player = audioElement.current;

    //         // Check auto play

    //         if (playAudioOnClick) {
    //             if (playAudio) {
    //                 player.play();
    //             } else {
    //                 player.pause();
    //             }
    //         } else if (playAudioAutomatically) {
    //             // Check if delay
    //             if (audioPlayingDelay) {
    //                 setTimeout(() => {
    //                     player.play();
    //                 }, audioPlayingDelay * 1000);
    //             } else {
    //                 player.play();
    //             }
    //         }
    //     }
    // }, [
    //     playAudio,
    //     buttonInfo,
    //     buttonInfo.audios,
    //     buttonInfo.playAudioOnClick,
    //     buttonInfo.playAudioAutomatically,
    //     buttonInfo.audioPlayingDelay,
    // ]);

    // handle generating iframe

    useEffect(() => {
        const generateIframe = () => {
            let frame;
            frame = document.createElement('iframe');
            frame.src = buttonInfo.redirectTo;
            frame.width = buttonInfo.frameWidth;
            frame.height = buttonInfo.frameHeight;
            frame.style.position = 'absolute';
            frame.style.top = `${buttonInfo.framePositionFromTop}px`;
            frame.style.left = `${buttonInfo.framePositionFromLeft}px`;
            frameContainer.current.appendChild(frame);
            if (showIframe) {
                window.scrollTo(0, window.innerHeight);
            }
        };
        if (showIframe) generateIframe();
    }, [
        showIframe,
        buttonInfo.redirectTo,
        buttonInfo.frameWidth,
        buttonInfo.frameHeight,
        buttonInfo.framePositionFromTop,
        buttonInfo.framePositionFromLeft,
    ]);

    const goToCreateButtonpage = () => {
        history.push('/create-button');
    };

    const downloadFrame = () => {
        let frameSTR = frameShell.replace(
            'src',
            `src="${buttonInfo.redirectTo}"`
        );

        let blob = new Blob([frameSTR], { type: 'text/html;charset=utf-8' });

        saveAs(blob, 'downloaded-frame.html');
    };

    return (
        <div className={classes.root}>
            {/* Back button for navigation */}
            <IconButton
                className={classes.backButton}
                aria-label="navigate to previous page"
                onClick={goToCreateButtonpage}
            >
                <ExitToAppIcon fontSize="large" style={{ color: '#ffffff' }} />
            </IconButton>
            <div className={classes.modelContainer}>
                {Object.keys(buttonInfo).length === 0 ? (
                    <CircularProgress size={80} style={{ color: '#ffffff' }} />
                ) : buttonInfo.models ? (
                    <ModelRenderer buttonDetails={buttonInfo} />
                ) : (
                    <GIFRenderer buttonInfo={buttonInfo} />
                )}
            </div>

            {/* Container for iframe */}

            <div
                ref={frameContainer}
                className={showIframe ? classes.iframeContainer : {}}
            >
                {showIframe ? (
                    <IconButton
                        className={classes.downloadButton}
                        aria-label="download iframe"
                        onClick={downloadFrame}
                    >
                        <GetAppIcon
                            fontSize="large"
                            style={{ color: '#ffffff' }}
                        />
                    </IconButton>
                ) : null}
            </div>

            {/* {buttonInfo.audios ? (
                <audio
                    ref={audioElement}
                    className={classes.audioElement}
                    src={buttonInfo.audios}
                    loop={buttonInfo.playAudioInLoop}
                ></audio>
            ) : null} */}
        </div>
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
