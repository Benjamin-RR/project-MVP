import React, {useContext} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';

const Contact = () => {
    const {
        page,
        setPage
    } = useContext(CaptureContext);
    setPage("contact");
    return (
        <Wrapper>
            <div>Contact</div>
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

export default Contact;