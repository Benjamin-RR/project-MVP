import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {

    // start up data that only changes once per app load
    const [appLoaded, setAppLoaded] = useState(false);

    // for handling page and settings
    const [mediaQ, setMediaQ] = useState(window.matchMedia('(min-width: 600px'))
    const [page, setPage] = useState("home");
    const [settingsClick, setSettingsClick] = useState(false);
    const [dynamicMapStyle, setDynamicMapStyle] = useState(true);

    // for dropdown
    const [dropdown, setDropdown] = useState(false);
    const [friendClick, setFriendClick] = useState(false);

    //for loging in
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    // const [uniqueName, setUniqueName] = useState(localStorage.getItem("uniqueName"));
    // const [userColor, setUserColor] = useState(localStorage.getItem("userColor"));
    // const [friendArray, setFriendArray] = useState(null);
    // let temp = localStorage.getItem("friends");
    // if (temp && !appLoaded) setFriendArray(temp.split(","));

    // get user's current location
    const [myLocation, setMyLocation] = useState(null);
    navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation(position)
    }, () => null)

    // to remember which one capture we are viewing.
    const [currentCapture, setCurrentCapture] = useState(null);

    // setAppLoaded(true);

    return (
        <CaptureContext.Provider value={{ 
            page,
            setPage,
            dropdown,
            setDropdown,
            userID,
            setUserID,
            mediaQ,
            setMediaQ,
            // uniqueName, 
            // setUniqueName,
            myLocation,
            setMyLocation,
            friendClick, 
            setFriendClick,
            // friendArray, 
            // setFriendArray,
            settingsClick,
            setSettingsClick,
            dynamicMapStyle,
            setDynamicMapStyle,
            // userColor,
            // setUserColor,
            currentCapture,
            setCurrentCapture
        }}>
            {children}
        </CaptureContext.Provider>
    );
};