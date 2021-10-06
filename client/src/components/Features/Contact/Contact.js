import React, {useContext, useEffect} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';

const Contact = () => {
    const {
        setPage
    } = useContext(CaptureContext);
    
    useEffect(() => {
        setPage("contact");

    },[])
    return (
        <Wrapper>
            <div
                style={{ color: "white"}}
            >If you are interested in contacting the developer of this MVP. You may find him on Linkedin <a href="https://www.linkedin.com/in/benjaminrobertrussell/" target="_blank" >here</a>.</div>
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