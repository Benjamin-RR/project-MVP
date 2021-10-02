import React, {useEffect, useContext, useState} from "react";
import { CaptureContext } from "../CaptureContext";
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow, useLoadScript} from 'react-google-maps';
import Midnight from './Styles/Midnight';
import Day from './Styles/Day';
import Rise from './Styles/Rise';
import GoogleMapReact from 'react-google-maps';
import styled from "styled-components";
import Loader from '../Common/Loader'
import moment from 'moment';
// import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";


function thisMap() {
    const {
        page,
        setPage,
        userID,
        myLocation,
        setMyLocation,
        dynamicMapStyle,
        setDynamicMapStyle
    } = useContext(CaptureContext);
    const libraries = ["places"];
    
    let position;   // used to center map.
    let data;       // used from single capture.
    data = JSON.parse(localStorage.getItem("CaptureInfo") );
    // if data from a single capture brought us to this map
    if (data) {
        data = [data.data];
        console.log("DATA FROM SINGLE CAPTURE:" , data[0]);
        position = {lat: data[0].capture.location.lat, lng: data[0].capture.location.lng}
    } 
    else 
    // if we clicked on the explore / map ourselves.
    {

        console.log("MY LOCATION:" , myLocation);
        position = { lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }
    }
    console.log("MAP IS CENTERED ON:" , position);


    // lat: myLocation.coords.latitude, lng: myLocation.coords.longitude

    // const {isLoaded, loadError} = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_HEATMAP_KEY,
    //     libraries, 
    // })

    // if (loadError) return "Error loading maps";
    // if (!isLoaded) return "Loading Maps";

    // return <div>map!</div>;

    // find time, find style dependable upon that time (dawn, day, dusk, night) OR if dynamic style is turned 
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

    // find marker -- will be dynamic later.
    let marker = `/markerVerified.png`
    // marker = `/markerUnverified.png`
    // marker = `/markerDoc.png`


    const [selectedMarker, setSelectedMarker] = useState(null);

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
            { (myLocation || data) ? (
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={position}
                    defaultOptions={{ 
                        styles: mapStyle,
                        // streetViewControl: false,
                        disableDefaultUI: true
                    }}
                >
                    { data.map(each => {
                        console.log("MAPPED DATA of each:", each);
                        <div
                            key={Math.floor(Math.random) * 99999999}
                        >
                            <Marker 
                                position={{ lat: 45.3780541, lng: -72.7243079 }}
                                icon={{
                                    url: `${marker}`,
                                    // url: `/markerVerified.png`,
                                    scaledSize: new window.google.maps.Size(48, 70),
                                    // visible: true
                                }}
                                onClick={() => {
                                    setSelectedMarker(location)
                                }}
                                // visible="true"
                            />
                            {/* <Marker 
                                position={{ lat: 45.3780541, lng: -72.7243079 }}
                                icon={{
                                    url: `${marker}`,
                                    scaledSize: new window.google.maps.Size(48, 70)
                                }}
                                onClick={() => {
                                    setSelectedMarker(location)
                                }}
                            /> */}
                        </div>
                    })}

                    { selectedMarker && (
                        <InfoWindow
                            position={{ lat: data.capture.location.lat, lng: data.capture.location.lng }}
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
                // useLoadScript={ googleMapsApiKey=`${process.env.REACT_APP_GOOGLE_HEATMAP_KEY}`, libraries }
            />
        </MapWrapper>
    )
}

const MapWrapper = styled.div`
    height: 100%;
    width: 100%;
`