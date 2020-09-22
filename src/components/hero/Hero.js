import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import HeroText from '../heroText/HeroText'
import HeroImageSlider from '../heroImageSlider/HeroImageSlider'


const useStyle = makeStyles((theme) => ({
    root : {
        width: "100%",
        height: "90vh",
        background: "#014E58",
        padding: "100px 74px",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",

    }
}))

export default function Hero() {

    const classes = useStyle();
    return (
        <div className={classes.root}>
            <HeroText />
            <HeroImageSlider />
        </div>
    )
}
