import React, {useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';

const Home = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);
    setPage("home");


    return (
        <Wrapper>
            <div>Home</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 500px;
    width: 100%;
    border: 1px solid black;
`

export default Home;