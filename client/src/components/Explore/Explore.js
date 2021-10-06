import React, {useContext, useEffect} from 'react';
import { CaptureContext } from '../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 
import Map from './Map/Map'

const Explore = () => {
    const {
        setPage,
        userID,
        setFirstMapLoad,
    } = useContext(CaptureContext);

    useEffect(() => {
        setPage("explore");
        setFirstMapLoad(true);

    },[])

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