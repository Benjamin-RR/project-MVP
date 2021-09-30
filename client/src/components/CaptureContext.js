import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {
    const [page, setPage] = useState("home");
    const [dropdown, setDropdown] = useState(false);
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [mediaQ, setMediaQ] = useState(window.matchMedia('(min-width: 600px'))
    const [uniqueName, setUniqueName] = useState(localStorage.getItem("uniqueName"));
    const [myLocation, setMyLocation] = useState(null);
    const [friendClick, setFriendClick] = useState(false);
    const [friendArray, setFriendArray] = useState(((localStorage.getItem("friends")).split(",")));
    const [settingsClick, setSettingsClick] = useState(false);
    const [dynamicMapStyle, setDynamicMapStyle] = useState(true);

    // get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation(position)
    }, () => null)


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
            uniqueName, 
            setUniqueName,
            myLocation,
            setMyLocation,
            friendClick, 
            setFriendClick,
            friendArray, 
            setFriendArray,
            settingsClick,
            setSettingsClick,
            dynamicMapStyle,
            setDynamicMapStyle
        }}>
            {children}
        </CaptureContext.Provider>
    );
};