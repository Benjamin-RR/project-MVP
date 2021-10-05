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
        setCurrentCapture
    } = useContext(CaptureContext);
    const libraries = ["places"];
    const [mapDataLoading, setMapDataLoading] = useState(true);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [captureArray, setCaptureArray] = useState(null);

    // get position for map, and data (an array of captures to render)
    let position;   // used to center map.
    if (currentCapture) {
        setCaptureArray(currentCapture.data);
        position= { lat: currentCapture.data.capture.location.lat , lng: currentCapture.data.capture.location.lng }
    } else {
        position = { lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }
    }

    // get array of captures for later rendering.
    useEffect( async ()=> {
        if (!currentCapture) {
            const data = await getCapturesForMap(position);
            // console.log("data received in Maps:" , data);
            setCaptureArray(data);
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
    const MarkerDoc = `/markerDoc.png`      // alternative marker for future update.
    

    // var heatmapData = [
    //     new google.maps.LatLng(37.782, -122.447),
    //     new google.maps.LatLng(37.782, -122.445),
    //     new google.maps.LatLng(37.782, -122.443),
    //     new google.maps.LatLng(37.782, -122.441),
    //     new google.maps.LatLng(37.782, -122.439),
    //     new google.maps.LatLng(37.782, -122.437),
    //     new google.maps.LatLng(37.782, -122.435),
    //     new google.maps.LatLng(37.785, -122.447),
    //     new google.maps.LatLng(37.785, -122.445),
    //     new google.maps.LatLng(37.785, -122.443),
    //     new google.maps.LatLng(37.785, -122.441),
    //     new google.maps.LatLng(37.785, -122.439),
    //     new google.maps.LatLng(37.785, -122.437),
    //     new google.maps.LatLng(37.785, -122.435)
    // ];
    
    // var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: sanFrancisco,
    //     zoom: 13,
    //     mapTypeId: 'satellite'
    // });
    
    // var heatmap = new google.maps.visualization.HeatmapLayer({
    //     data: heatmapData
    // });
    // heatmap.setMap(map);

    // mProvider = new HeatmapTileProvider.Builder()
    //     .data(data)
    //     .gradient(gradient)
    //     .build();

    // mOverlay = mMap.addTileOverlay(
    //     new TileOverlayOptions().tileProvider(mProvider));
    
    // // int[] colors = {
    // //     Color.rgb(102, 225, 0), //green
    // //     Color.rgb(225, 0, 0) //red
    // // }
    
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
                        console.log("each:" , each);
                        return(
                            <Marker 
                                key={Math.floor(Math.random) * 99999999}
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
                // useLoadScript={ googleMapsApiKey=`${process.env.REACT_APP_GOOGLE_HEATMAP_KEY}`, libraries }
            />
        </MapWrapper>
    )
}

const MapWrapper = styled.div`
    height: 100%;
    width: 100%;
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