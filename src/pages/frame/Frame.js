import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
    },
    frame: {
        width: '100%',
        height: '100vh',
    },
}));

function Frame(props) {
    const classes = useStyle();

    const buttonInfo = props.button.button;
    return (
        <div className="root">
            {buttonInfo.redirectTo ? (
                <iframe
                    className={classes.frame}
                    src={buttonInfo.redirectTo}
                    title="User customized frame"
                ></iframe>
            ) : null}
        </div>
    );
}

//mapping state to props

const mapStateToProps = (state) => {
    return {
        button: state.button,
        control: state.control,
    };
};

export default connect(mapStateToProps, null)(Frame);
