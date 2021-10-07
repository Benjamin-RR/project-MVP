import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {
    // start up data that only changes once per app load
    const [appLoaded, setAppLoaded] = useState(false);

    // for handling page and settings
    const [mediaQ, setMediaQ] = useState(window.matchMedia('(min-width: 600px'));
    const [page, setPage] = useState("home");
    const [homeHasLoaded, setHomeHasLoaded] = useState(false);

    // for google map
    const [searchSize, setSearchSize] = useState({width: "45px", height: "45px"});
    const [searchQuery, setSearchQuery] = useState({certified: true, unCertified: false, animal: "", user: ""});
    const [mapDataLoading, setMapDataLoading] = useState(true);
    const [firstMapLoad, setFirstMapLoad] = useState(true);
    const [comingFrom, setComingFrom] = useState(null);
    const [captureArray, setCaptureArray] = useState(null);

    // settings
    const [settingsClick, setSettingsClick] = useState(false);
    const [badgeSetting, setBadgeSetting] = useState(true);
    const [dynamicMapStyle, setDynamicMapStyle] = useState(true);
    const [dynamicBanner, setDynamicBanner] = useState(false);
    const [statsOnRatingOthers, setStatsOnRatingOthers] = useState(true);
    
    // for dropdown
    const [dropdown, setDropdown] = useState(false);
    const [friendClick, setFriendClick] = useState(false);

    //for loging in
    const [userID, setUserID] = useState(localStorage.getItem("userID"));

    // get user's current location
    const [myLocation, setMyLocation] = useState(null);
    if (!myLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setMyLocation(position)
        }, () => null)
    }

    // to remember which one capture we are viewing.
    const [currentCapture, setCurrentCapture] = useState(null);
    const [profileOption, setProfileOption] = useState("Statistics");

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
            myLocation,
            setMyLocation,
            friendClick, 
            setFriendClick,
            settingsClick,
            setSettingsClick,
            badgeSetting, 
            setBadgeSetting,
            dynamicMapStyle,
            setDynamicMapStyle,
            currentCapture,
            setCurrentCapture,
            profileOption,
            setProfileOption,
            dynamicBanner,
            setDynamicBanner,
            statsOnRatingOthers,
            setStatsOnRatingOthers,
            appLoaded, 
            setAppLoaded,
            homeHasLoaded, 
            setHomeHasLoaded,
            searchSize, 
            setSearchSize,
            searchQuery, 
            setSearchQuery,
            mapDataLoading, 
            setMapDataLoading,
            firstMapLoad,
            setFirstMapLoad,
            comingFrom,
            setComingFrom,
            captureArray, 
            setCaptureArray,
        }}>
            {children}
        </CaptureContext.Provider>
    );
};