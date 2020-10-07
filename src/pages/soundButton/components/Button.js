import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: 'auto',
    },
    paper: {
        width: '100%',
        minHeight: '400px',
        padding: theme.spacing(3),
        cursor: 'pointer',
        dispaly: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function Button(props) {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Paper elevation={10} className={classes.paper}>
                {props.children}
            </Paper>
        </div>
    );
}
