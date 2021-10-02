import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {

    // start up data that only changes once per app load
    const [appLoaded, setAppLoaded] = useState(false);

    // for handling page and settings
    const [mediaQ, setMediaQ] = useState(window.matchMedia('(min-width: 600px'))
    const [page, setPage] = useState("home");
    // settings
    const [settingsClick, setSettingsClick] = useState(false);
    const [badgeSetting, setBadgeSetting] = useState(true);
    const [dynamicMapStyle, setDynamicMapStyle] = useState(true);
    

    // for dropdown
    const [dropdown, setDropdown] = useState(false);
    const [friendClick, setFriendClick] = useState(false);

    //for loging in
    const [userID, setUserID] = useState(localStorage.getItem("userID"));

    // get user's current location
    const [myLocation, setMyLocation] = useState(null);
    navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation(position)
    }, () => null)

    // to remember which one capture we are viewing.
    const [currentCapture, setCurrentCapture] = useState(null);

    const [profileOption, setProfileOption] = useState("Statistics")


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
            badgeSetting, 
            setBadgeSetting,
            dynamicMapStyle,
            setDynamicMapStyle,
            // userColor,
            // setUserColor,
            currentCapture,
            setCurrentCapture,
            profileOption,
            setProfileOption
        }}>
            {children}
        </CaptureContext.Provider>
    );
};