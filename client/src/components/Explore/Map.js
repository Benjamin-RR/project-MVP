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
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";



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

    // const {isLoaded, loadError} = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_HEATMAP_KEY,
    //     libraries, 
    // })

    // if (loadError) return "Error loading maps";
    // if (!isLoaded) return "Loading Maps";

    // return <div>map!</div>;

    // find time, find style dependable upon that time (dawn, day, dusk, night)
    const Time = moment().calendar()
    let mapStyle;
    if (dynamicMapStyle) {
        if (Time.includes("6")) {
            mapStyle = Rise;
        }
        if ( Time.includes("P") && ((Time.split(":")[0]).split(" ")[2] < 6) || Time.includes("P") && ((Time.split(":")[0]).split(" ")[2] == 12) || Time.includes("A") && ((Time.split(":")[0]).split(" ")[2] > 6)) {
            mapStyle = Day;
        } else {
            mapStyle = Midnight
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
                    {/* { locations.map(location => { */}
                        <div
                            key={Math.floor(Math.random) * 99999999}
                        >
                            <Marker 
                                position={{ lat: myLocation.coords.latitude, lng: myLocation.coords.longitude }}
                                icon={{
                                    url: `${marker}`,
                                    scaledSize: new window.google.maps.Size(48, 70)
                                }}
                                onClick={() => {
                                    setSelectedMarker(location)
                                }}
                            />
                        </div>
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

    console.log("CHECKING:" , process.env.REACT_APP_GOOGLE_HEATMAP_KEY)

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