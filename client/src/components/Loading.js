import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        justifyContent: 'center',
        marginTop: '40px',
        alignItems: 'center',
        flexDirection: 'column'
    },
}));


function Loading({ texto }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
            {texto && (
                <div>
                    <p>{texto}</p>
                </div>
            )}
        </div>
    )
}

export default Loading