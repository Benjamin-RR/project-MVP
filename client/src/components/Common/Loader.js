// Loader for components that have fetches ect.
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
        marginLeft: theme.spacing(2),
        },
    },
}));

export default function LoadingProgress() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            {/* <Loader color="secondary" /> */}
            <Wrapper>
                <Loader 
                    style={{ color: "green"}}
                />
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    height: "100%";
    width: "100%";
    display: "flex";
    flex-direction: "column";
    justify-content: "center";
    align-items: "center";
`