import React, {useEffect, useContext, useState} from "react";
import { CaptureContext } from "../../CaptureContext";
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

import styled from "styled-components";
import moment from 'moment';
import {getCapturesForMap} from './MapHelper/Fetch';
import {Image} from 'cloudinary-react';
import Search from "./Search";
import { useHistory } from 'react-router';
import {getMapStyle} from './MapHelper/DynamicMapStyle';
import {filterDataWithSearchQuery} from './MapHelper/SearchQuery';

function thisMap() {
    const {
        myLocation,
        currentCapture, 
        setCurrentCapture,
        searchQuery, 
        mapDataLoading, 
        setMapDataLoading,
        firstMapLoad, 
        setFirstMapLoad,
        comingFrom,
        setComingFrom,
        captureArray, 
        setCaptureArray,
    } = useContext(CaptureContext);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [AllCaptureArray, setAllCaptureArray] = useState(null);

    let history = useHistory();
    const mapStyle = getMapStyle();

    // get center position for map.
    let position;   // used to center map.
    if (comingFrom === 'singleCapture') {
        setCaptureArray(currentCapture);
        position= { lat: currentCapture[0].capture.location.lat , lng: currentCapture[0].capture.location.lng }

    } else {
        if (firstMapLoad) {
            position = { lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }
        }
    }


    // get new array of captures by filter, if a search query is present.
    useEffect(()=> {
        // function clearOverlays() {
        //     if (AllCaptureArray) {
        //         for (var i = 0; i < AllCaptureArray.length; i++ ) {
        //             AllCaptureArray[i].setMap(null);
        //         }
        //         AllCaptureArray.length = 0;
        //     }
        // }
        setCaptureArray(filterDataWithSearchQuery(AllCaptureArray, searchQuery));
        setMapDataLoading(false);
    },[searchQuery]);


    // get array of captures for later rendering. (set map data loading now to false.)
    useEffect( async ()=> {
        setFirstMapLoad(false);

        if (!currentCapture) {
            const data = await getCapturesForMap(position)
            await setAllCaptureArray(data)   // never changes
        } else {
            setCaptureArray(currentCapture); // might need this to fix bug clicking on link to explore map.
        }
    }, [captureArray])
    
    if (AllCaptureArray && mapDataLoading) {
        setCaptureArray(filterDataWithSearchQuery(AllCaptureArray, searchQuery));
        setMapDataLoading(false);
    }

    // function gets marker image by value passed to it which is the verifed value from any Capture obj.
    const getMarker = (byVerification) => {
        let answer;
        if (byVerification) {
            answer=`/markerVerified.png`
        } else {
            answer=`/markerUnverified.png`
        }
        return answer;
    }

    // validates the link the user is attempting to go to isn't his/her own capture.
    const validateRedirect = (data) => {
        if (data.author === localStorage.getItem("uniqueName")) {
            return;
        }
        history.push('/Rate')
    }

    // console.log("DATA THAT WILL RENDER ON MAP:" , captureArray);
    return(
        <>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={position}
                defaultOptions={{ 
                    styles: mapStyle,
                    // streetViewControl: false,
                    disableDefaultUI: true
                }}
            >
                { (!mapDataLoading && captureArray) && ( 
                    <>
                        { captureArray.map((each, indx) => {
                            return(
                                <Marker 
                                    key={Math.random()*99999999}
                                    position={{ lat: each.capture.location.lat, lng: each.capture.location.lng }}
                                    icon={{
                                        url: `${getMarker(each.capture.verified)}`,
                                        scaledSize: new window.google.maps.Size(48, 70),
                                    }}
                                    onClick={() => {
                                        setSelectedMarker(each)
                                    }}
                                /> 
                            )
                        })}
                    </>
                )}

                { selectedMarker && (
                    <InfoWindow
                        position={{ lat: selectedMarker.capture.location.lat, lng: selectedMarker.capture.location.lng }}
                        onCloseClick={()=>{
                            setSelectedMarker(null);
                        }}
                    >
                        <InfoStyle>
                            <h3>{selectedMarker.capture.animalName}</h3>
                            <Text>Captured by {selectedMarker.author} {moment(`${selectedMarker.timeStamp}`).startOf('day').fromNow()}.</Text>
                            <ImageWrapper
                                onClick={() => {
                                    setCurrentCapture(selectedMarker);
                                    setComingFrom('map');
                                    validateRedirect(selectedMarker);
                                }}
                                // to="/Explore"
                            >
                                <Image
                                    alt="img"
                                    cloudName="capturecapture"
                                    publicId={selectedMarker.public_id}
                                    width="100"
                                    crop="scale"
                                />
                            </ImageWrapper>
                        </InfoStyle>
                    </InfoWindow>
                )}
            </GoogleMap>

        </>
    )
}

const TheMap = withScriptjs(withGoogleMap(thisMap))

export default function Map() {
    return (
        <MapWrapper>
            <SearchWrapper>
                <Search />
            </SearchWrapper>
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

const SearchWrapper = styled.div`
    display: flex;
    position: absolute;
    height: 45px;
`

const InfoStyle = styled.div`
    background: lightgrey;
    border-radius: 5px;
    padding: 5px;
`

const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Text = styled.div`
    display: flex;
    padding: 3px;
`