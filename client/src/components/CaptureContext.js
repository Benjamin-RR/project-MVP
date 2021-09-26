import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {
    const [page, setPage] = useState("home");
    const [dropdown, setDropdown] = useState(false);
    // const test = localStorage.getItem("purchaseID")
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    // if (userID) {
    //     console.log("user should be logged on now.");
    // } else {
    //     console.log("user should not be logged on now.");
    // }
    // console.log("user:" , userID)
    // console.log("test", test);





return (
    <CaptureContext.Provider value={{ 
        page,
        setPage,
        dropdown,
        setDropdown,
        userID,
        setUserID,
    }}>
        {children}
    </CaptureContext.Provider>
    );

};