import React, {useContext} from 'react';
import { CaptureContext } from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import Map from './Map'

const Explore = () => {
    const {
        page,
        setPage,
        userID
    } = useContext(CaptureContext);
    setPage("explore");

    let history = useHistory();
    { !userID && 
        history.push("/Login")
    }

    return (
        <Wrapper>
            <MapWrapper>
                <Map />
            </MapWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: var(--defaultHeight);
    width: 100%;
`

const MapWrapper = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid black;
`

export default Explore;