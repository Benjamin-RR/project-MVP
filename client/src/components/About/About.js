import React, {useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';

const DM = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);
    setPage("about");
    return (
        <Wrapper>
            <div>About</div>
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

export default DM;