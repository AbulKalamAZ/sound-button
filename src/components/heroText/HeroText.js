import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyle = makeStyles((theme) => ({
    root: {
        width: "50%",
        height: "auto",
        fontSize: "3rem",
        color: "#FEFEFC"

    },
    orangeText: {
        color: "#FF5F58"
    }, 
    button: {
        fontFamily: "'Livvic', sans-serif",
        textTransform: "none",
        borderRadius: 25,
        padding: "5px 25px"
    }
}))
export default function HeroText() {

    const classes = useStyle();

    return (
        <div class={classes.root}>
            <h1>Find out your<br/> best <span className={classes.orangeText}>talent</span></h1>

            <Button color="inherit" size="large" variant="outlined" className={classes.button}>Get Started</Button>
        </div>
    )
}
