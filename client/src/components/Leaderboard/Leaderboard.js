import React, {useContext, useEffect} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

const Leaderboard = () => {
    const {
        page,
        setPage,
        userID
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("leaderboard");

    },[])

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    return (
    <Wrapper>
        <div>Leaderboard</div>
        <Body>Leaderboard is currently down due to maintenance</Body>    
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
    border: 1px solid black;
    padding: 10px;
`

const Body = styled.div`
    height: 300px;
    display: flex;
    align-items: center;
`

export default Leaderboard;