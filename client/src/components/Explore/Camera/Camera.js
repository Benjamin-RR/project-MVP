import React, {useContext, useEffect} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

const Camera = () => {
    const {
        page,
        setPage,
        userID
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("camera");

    },[])

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    return (
    <Wrapper>
        <div>camera</div>
    </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
    border: 1px solid brown;
    padding: 10px;
`

const Body = styled.div`
    height: 300px;
    display: flex;
    align-items: center;
`

export default Camera;