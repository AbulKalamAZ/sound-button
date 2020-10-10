import React from 'react';
import './Button.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Background from '../../../assets/button_background.png';
// import Spider from '../../../assets/Spider.obj';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: 'auto',
    },
    paper: {
        width: '100%',
        minHeight: '400px',
        padding: theme.spacing(3),
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
            'radial-gradient(circle, rgba(246,246,246,0.969625350140056) 0%, rgba(100,95,95,1) 0%, rgba(56,50,50,0.9780287114845938) 100%)',
        perspective: '600px',
    },
    background: {
        width: '100%',
        height: '90%',
        position: 'absolute',
        bottom: '0',
        left: '0',
        transform: 'rotateX(75deg)',
        transformOrigin: 'bottom',
    },
    paperOverGIF: {
        width: '100%',
        minHeight: '400px',
        padding: theme.spacing(3),
        cursor: 'pointer',
        dispaly: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    xModel: {
        width: '100%',
        height: '300px',
    },
}));

export default function Button(props) {
    const classes = useStyle();
    const { models } = props.buttonInfo;
    return (
        <div className={classes.root}>
            {models ? (
                <Paper elevation={10} className={classes.paper}>
                    <img
                        className={classes.background}
                        src={Background}
                        alt="button background"
                    />
                    {/* <x-model class="x-model" src={models}></x-model> */}
                </Paper>
            ) : (
                <Paper elevation={10} className={classes.paperOverGIF}>
                    {props.children}
                </Paper>
            )}
        </div>
    );
}
