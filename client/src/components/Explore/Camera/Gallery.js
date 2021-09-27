import React, {useContext} from 'react';
import {CaptureContext} from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

const Gallery = () => {
    const {
        page,
        setPage,
        userID
    } = useContext(CaptureContext);
    setPage("gallery");

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    return (
    <Wrapper>
        <div>gallery</div>   
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

export default Gallery;