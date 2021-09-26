import React, {useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';

const Leaderboard = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);
    setPage("leaderboard");
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
    height: 500px;
    width: 100%;
    border: 1px solid brown;
    padding: 10px;
`

const Body = styled.div`
    height: 300px;
    display: flex;
    align-items: center;
`

export default Leaderboard;