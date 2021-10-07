import React, {useEffect, useContext, useState} from "react";
import { CaptureContext } from "../../CaptureContext";
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

import styled from "styled-components";
import Loader from '../../Common/Loader'
import moment from 'moment';
import {getCapturesForMap} from './Fetch';
import {Image} from 'cloudinary-react';
import Search from "./Search";
import { useHistory } from 'react-router';
import {getMapStyle} from './MapHelper/DynamicMapStyle';


function thisMap(from) {
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
        setCaptureArray(currentCapture.data);
        position= { lat: currentCapture.data.capture.location.lat , lng: currentCapture.data.capture.location.lng }
    } else {
        if (firstMapLoad) {
            position = { lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }
        }
    }

    // filter data with search query
    const filterDataWithSearchQuery = () => {
        
        let finalAnswer = [];
        // console.log("captureArray received to FILTER:" , AllCaptureArray);
        // console.log("searchQuery received to FILTER:" , searchQuery);
        let verified = false;
        let unverified = false;
        if (!AllCaptureArray) {
            return;
        }

        // AllCaptureArray.forEach(capture => {
        //     capture.setMap(null);
        // })
        
        // searchQuery {certified: false, unCertified: false, animal: null, user: null}
        if (searchQuery.certified) {
            verified = true;
            let answer = AllCaptureArray.filter(verifiedCaptures)
            function verifiedCaptures(capture){
                return (
                    capture.capture.verified
                )
            }
            answer.forEach(capture => {
                finalAnswer.push(capture);
            })
        }
        if (searchQuery.unCertified) {
            unverified = true;
            let answer = AllCaptureArray.filter(unVerifiedCaptures)
            function unVerifiedCaptures(capture){
                return (
                    !capture.capture.verified
                )
            }
            answer.forEach(capture => {
                finalAnswer.push(capture);
            })
        }

        if (!verified && !unverified) {
            finalAnswer = AllCaptureArray;
        }

        if (searchQuery.animal.length > 0) {
            finalAnswer = finalAnswer.filter(animal)
            function animal(capture){
                return (
                    (capture.capture.animalName).toLowerCase() === (searchQuery.animal).toLowerCase()
                )
            }
        }
        
        if (searchQuery.user.length > 0) {
            finalAnswer = finalAnswer.filter(user)
            function user(capture){
                return (
                    (capture.author).toLowerCase() === (searchQuery.user).toLowerCase()
                )
            }
        }
        // if (!finalAnswer) {
        //     finalAnswer = [];
        // }
        // console.log("answer:" , finalAnswer);
        
        setCaptureArray(finalAnswer);
        // setPage('explore');
        // return answer;
        // Marker = null;
        setMapDataLoading(false);
    }
    

    // get new array of captures by filter, if a search query is present.
    useEffect(()=> {
        // console.log("did we receive a query?");
        // console.log("SEARCH QUERY:" , searchQuery);
            // console.log("are we beginning the filters?");
            // console.log("checking here");
            // if (captureArray) {
                filterDataWithSearchQuery();
                // setMapDataLoading(false);
            // }
    },[searchQuery]);
    // {certified: false, unCertified: false, animal: null, user: null}


    // get array of captures for later rendering. (set map data loading now to false.)
    useEffect( async ()=> {
        setFirstMapLoad(false);

        if (!currentCapture) {
            // const data = await getCapturesForMap(position);

            // console.log("data received in Maps:" , data);
            // const filtered = filterDataWithSearchQuery(data);

            // setCaptureArray(data);      // changes with filter
            // setAllCaptureArray(data);   // never changes
            // filterDataWithSearchQuery();
            const data = await getCapturesForMap(position)
            .then( async (data) => {
                // console.log("data fetch:" , data);
                // await setCaptureArray(data)      // changes with filter
                await setAllCaptureArray(data)   // never changes
            })
            // .then( async (data) => {
            //     await filterDataWithSearchQuery();
            // })
        } else {
            // setCaptureArray(currentCapture); // might need this to fix bug clicking on link to explore map.
        }
    }, [captureArray])

    // useEffect(() => {
    //     filterDataWithSearchQuery();

    // }, [mapDataLoading])
    
    if (AllCaptureArray && mapDataLoading) {
        filterDataWithSearchQuery();
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
    // console.log("pins need refresh?:" , refreshPins);
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
    const {
        page,
        setPage,
        userID,
        myLocation,
        setMyLocation,
        dynamicMapStyle,
        setDynamicMapStyle,
        currentCapture, 
        setCurrentCapture,
        searchSize, 
        setSearchSize,
        mapDataLoading,
        mapRefresh,
        setMapRefresh
    } = useContext(CaptureContext);

    // useEffect(() => {
    //     setMap(null)
    // },[mapDataLoading])
    
    // console.log("map refresh: " , mapRefresh);
    // if (mapRefresh) {
    //     setMapRefresh(false);
    // }

    // console.log("test:" , TheMap);

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
                // useLoadScript={ googleMapsApiKey=`${process.env.REACT_APP_GOOGLE_HEATMAP_KEY}`, libraries }
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