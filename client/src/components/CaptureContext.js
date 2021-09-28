import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {
    const [page, setPage] = useState("home");
    const [dropdown, setDropdown] = useState(false);
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [mediaQ, setMediaQ] = useState(window.matchMedia('(min-width: 600px'))
    const [uniqueName, setUniqueName] = useState(localStorage.getItem("uniqueName"));
    const [myLocation, setMyLocation] = useState(null);

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
        }}>
            {children}
        </CaptureContext.Provider>
    );
};