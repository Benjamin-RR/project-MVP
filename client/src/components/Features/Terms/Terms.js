import React, {useContext, useEffect} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';

const Terms = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("terms");

    },[])

    console.log("CHECK FROM TERMS");
    return (
        <Wrapper>
            <div>Terms</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
    border: 1px solid black;
`

export default Terms;