import React, {useEffect, useContext, useState} from "react";
import { CaptureContext } from "../CaptureContext";
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Midnight from './Styles/Midnight';
import Day from './Styles/Day';
import Rise from './Styles/Rise';
import GoogleMapReact from 'react-google-maps';
import styled from "styled-components";
import Loader from '../Common/Loader'
import moment from 'moment';


function thisMap() {
    const {
        page,
        setPage,
        userID,
        myLocation,
        setMyLocation
    } = useContext(CaptureContext);

    const Time = moment().calendar()
    let mapStyle;
    if (Time.includes("6")) {
        mapStyle = Rise;
    }
    if (Time.includes("P")) {
        mapStyle = Midnight;
    } else {
        mapStyle = Day;
    }

    const [selectedMarker, setSelectedMarker] = useState(null);

    return(
        <>
            { (myLocation) ? (
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={{ lat: myLocation.coords.latitude, lng: myLocation.coords.longitude}}
                    defaultOptions={{ 
                        styles: mapStyle,
                        // streetViewControl: false,
                        disableDefaultUI: true
                    }}
                    
                >
                    {/* { locaions.map(location => { */}
                        <Marker 
                            key={Math.floor(Math.random) * 99999999}
                            position={{ lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }}
                            icon={{
                                url: `/newUser.png`,
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                            onClick={() => {
                                setSelectedMarker(location)
                            }}
                        />
                    {/* })} */}

                    { selectedMarker && (
                        <InfoWindow
                            position={{ lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }}
                            onCloseClick={()=>{
                                setSelectedMarker(null);
                            }}
                        >
                            <div>
                                <div>animal</div>
                                <div>by user</div>
                                <div>time stamp</div>
                                <div>image</div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
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
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
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