import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        background: '#014E58',
        paddingTop: '100px',
        paddingBottom: '100px',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonGIF: {
        width: '100%',
        height: 'auto',
    },
    paperOverGIF: {
        width: '100%',
        minHeight: '400px',
        padding: theme.spacing(3),
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function GIFRenderer(props) {

    const classes = useStyle();
    const {buttonInfo} = props;
    console.log('from GIF Renderer!')

    return (
        <div className={classes.root}>
            <Container fixed className={classes.container}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={6}>
                        <Paper elevation={10} className={classes.paperOverGIF}>
                        
                            { buttonInfo.gifs ? (
                                <img
                                    className={classes.buttonGIF}
                                    src={buttonInfo.gifs}
                                    alt="Button media"
                                />
                            ) : 
                                ( <CircularProgress size={80} style={{color: '#004d40'}} /> )
                            }
                            

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>            
        </div>
    )
}
