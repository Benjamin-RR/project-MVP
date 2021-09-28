import React, {useEffect, useContext} from "react";
import { CaptureContext } from "../CaptureContext";
import { GoogleMap , withScriptjs, withGoogleMap} from 'react-google-maps';
import GoogleMapReact from 'react-google-maps';
import styled from "styled-components";
import Loader from '../Common/Loader'

function thisMap() {
    const {
        page,
        setPage,
        userID,
        myLocation,
        setMyLocation
    } = useContext(CaptureContext);
    
    console.log("pos:" , myLocation);
    
    return(
        <>
            { (myLocation) ? (
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{ lat: myLocation.coords.latitude, lng: myLocation.coords.longitude}}
                />
            ) : (
                <Loader />
            )}
        </>
    )
}

const TheMap = withScriptjs(withGoogleMap(thisMap))

export default function Map() {
    return (
        <MapWrapper>
            <TheMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            />
        </MapWrapper>
    )
}

const MapWrapper = styled.div`
    height: 100%;
    width: 100%;
`