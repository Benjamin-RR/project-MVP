import React, { useState } from 'react';
export const CaptureContext = React.createContext();

export const CaptureProvider = ({ children }) => {
    
    const [page, setPage] = useState("home");
    const [dropdown, setDropdown] = useState(false);
    const [user, setUser] = useState(null);


return (
    <CaptureContext.Provider value={{ 
        page,
        setPage,
        dropdown,
        setDropdown,
        user,
        setUser,
    }}>
        {children}
    </CaptureContext.Provider>
    );

};