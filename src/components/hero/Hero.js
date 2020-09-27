import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import HeroText from '../heroText/HeroText'
import HeroImageSlider from '../heroImageSlider/HeroImageSlider'


const useStyle = makeStyles((theme) => ({
    root : {
        width: "100%",
        minHeight: "90vh",
        background: "#014E58",
        paddingTop: "100px",
        paddingBottom: "100px",
    
    }, 
    container: {
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
            <Container fixed className={classes.container}>
                <HeroText />
                <HeroImageSlider />
            </Container>
        </div>
    )
}
