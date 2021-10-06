import React, {useEffect, useContext, useState} from "react";
import { CaptureContext } from "../../CaptureContext";
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Midnight from './Styles/Midnight';
import Day from './Styles/Day';
import Rise from './Styles/Rise';
import styled from "styled-components";
import Loader from '../../Common/Loader'
import moment from 'moment';
// import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {getCapturesForMap} from './Fetch';
import {Image} from 'cloudinary-react';
import Search from "./Search";


function thisMap(from) {
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
        searchQuery, 
        setSearchQuery,
        // mapDataLoading, 
        // setMapDataLoading,
        firstMapLoad, 
        setFirstMapLoad
    } = useContext(CaptureContext);
    const libraries = ["places"];
    const [mapDataLoading, setMapDataLoading] = useState(true);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [AllCaptureArray, setAllCaptureArray] = useState(null);
    const [captureArray, setCaptureArray] = useState(null);
    const [refreshMap, setRefreshMap] = useState(true);



    // get center position for map.
    let position;   // used to center map.
    if (currentCapture) {
        setCaptureArray(currentCapture.data);
        position= { lat: currentCapture.data.capture.location.lat , lng: currentCapture.data.capture.location.lng }
    } else {
        position = { lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }
    }


    // filter data with search query
    const filterDataWithSearchQuery = () => {
        let finalAnswer = [];
        console.log("captureArray received to FILTER:" , AllCaptureArray);
        console.log("searchQuery received to FILTER:" , searchQuery);
        let verified = false;
        let unverified = false;
        
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
        console.log("answer:" , finalAnswer);
        
        setCaptureArray(finalAnswer);
        // setPage('explore');
        // return answer;
    }
    

    // get new array of captures by filter, if a search query is present.
    useEffect(()=> {
        // console.log("did we receive a query?");
        console.log("SEARCH QUERY:" , searchQuery);
            // console.log("are we beginning the filters?");
            // console.log("checking here");
            if (captureArray) {
                filterDataWithSearchQuery();
                setMapDataLoading(false);
            }
    },[searchQuery]);
    // {certified: false, unCertified: false, animal: null, user: null}


    // get array of captures for later rendering. (set map data loading now to false.)
    useEffect( async ()=> {
        setFirstMapLoad(false);

        if (!currentCapture) {
            const data = await getCapturesForMap(position);
            // console.log("data received in Maps:" , data);
            const filtered = filterDataWithSearchQuery(data);
            setCaptureArray(data);      // changes for filter
            setAllCaptureArray(data);   // never changes
        }
        setMapDataLoading(false);
    }, [])


    // find time, find style dependable upon that time (dawn, day, dusk, night) OR if dynamic style is turned on.
    const Time = moment().calendar()
    let mapStyle;
    if (dynamicMapStyle) {
        if ( Time.includes("P") && ((Time.split(":")[0]).split(" ")[2] < 6) || Time.includes("P") && ((Time.split(":")[0]).split(" ")[2] == 12) || Time.includes("A") && ((Time.split(":")[0]).split(" ")[2] > 6) || Time.includes("A") && ((Time.split(":")[0]).split(" ")[2] == 12)) {
            mapStyle = Day;
        } else {
            mapStyle = Midnight;
        }
        if (Time.split(":")[0].includes("6")) {
            mapStyle = Rise;
        }
    } else {
        mapStyle = Day;
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


    console.log("DATA THAT WILL RENDER ON MAP:" , captureArray);
    return(
        <>
            { !mapDataLoading ? ( 
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={position}
                    defaultOptions={{ 
                        styles: mapStyle,
                        // streetViewControl: false,
                        disableDefaultUI: true
                    }}
                >
                    { captureArray.map((each, indx) => {
                        // console.log("each:" , each);
                        return(
                            <Marker 
                                key={indx}
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
                                <ImageWrapper>
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
            ) : (
                <div></div>
                // <Loader />
            )}
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
        setSearchSize
    } = useContext(CaptureContext);
    

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
`

const Text = styled.div`
    display: flex;
    padding: 3px;
`