import React, {useContext} from 'react';
import {CaptureContext} from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 

const DM = () => {
    const {
        page,
        setPage,
        userID
    } = useContext(CaptureContext);
    setPage("dm");

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    return (
        <Wrapper>
            <div>Direct Messages</div>
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