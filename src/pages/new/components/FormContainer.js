import React from 'react'

import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import InputFormOne from './InputFormOne'
import InputFormTwo from './InputFormTwo'
import InputFormThree from './InputFormThree'




const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        minHeight: "90vh",
        background: "#014E58",
        paddingTop: "100px",
        paddingBottom: "100px"
    },
    button: {
        padding: "10px 0",
        color: "#ffffff",
        background: '#f44336',
        '&:hover': {
            background: "#d32f2f"
        }
    },
}))


export default function FormContainer() {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <InputFormOne />
                    </Grid>
                    <Grid item xs={12}>
                        <InputFormTwo />
                    </Grid>
                    <Grid item xs={12}>
                        <InputFormThree />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            size='large'
                            className={classes.button}
                            fullWidth={true}
                        >
                            Create Button
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
