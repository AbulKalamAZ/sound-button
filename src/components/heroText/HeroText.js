import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '50%',
        height: 'auto',
        fontSize: '3rem',
        color: '#FEFEFC',
        paddingBottom: '80px',
    },
    orangeText: {
        color: '#FF5F58',
    },
    button: {
        fontFamily: "'Livvic', sans-serif",
        textTransform: 'none',
        borderRadius: 25,
        padding: '5px 25px',
        color: '#FEFEFC',
    },
    link: {
        textDecoration: 'none',
    },
}));
export default function HeroText() {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <h1>
                Find out your
                <br /> best <span className={classes.orangeText}>talent</span>
            </h1>

            <Link className={classes.link} to="/create-button">
                <Button
                    color="inherit"
                    size="large"
                    variant="outlined"
                    className={classes.button}
                >
                    Get Started
                </Button>
            </Link>
        </div>
    );
}
