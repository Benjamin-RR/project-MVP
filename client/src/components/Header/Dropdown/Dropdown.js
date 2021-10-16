import React, {useContext, useState} from 'react';
import { CaptureContext } from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 


const Dropdown = () => {
    const {
        setDropdown,
        setUserID,
        mediaQ,
        setFriendClick,
        setSettingsClick,
    } = useContext(CaptureContext);
    let history = useHistory();

    // handle reponsive window.
    mediaQ.onchange = (e) => {
        // window.location.reload();
    }
    let thisTop = '32px';
    if (mediaQ.matches) {
        thisTop = '60px'
    }

    // handle dropdown
    const handleMouseEnter = () => {
        // if (!friendClick) {
            setDropdown(true)
        // }  
    }
    const handleMouseLeave = () => {
        // if (!friendClick) {
            setDropdown(false)
        // }    
    }

    // handle account being clicked
    const handleAccountClick = () => {
        setDropdown(false)
        // setAccountClick(true);
        history.push("/Account")
    }
    // handle friend being clicked
    const handleFriendClick = () => {
        setDropdown(false)
        setFriendClick(true);
        history.push("/Friends")
    }
    // handle help being clicked
    const handleHelpClick = () => {
        setDropdown(false)
        history.push("/Help")
    }
    // handle settings being clicked
    const handleSettingsClick = () => {
        setDropdown(false)
        setSettingsClick(true);
        history.push("/Settings")
    }

    // handle sign out.
    const handleSignOut = () => {
        // remove all signed in user info from local storage.
        localStorage.removeItem("userID");
        localStorage.removeItem("uniqueName");
        localStorage.removeItem("userColor");
        localStorage.removeItem("friends");
        setUserID(null);
        window.location.reload();
    }

    return(
        <Wrapper
            style={{ top: `${thisTop}` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <DropDownHide />
            <DropDownHide />
            <DropDownItem
                onClick={handleAccountClick} type="submit"
            >Account</DropDownItem>
            <DropDownItem
                onClick={handleFriendClick} type="submit"
            >Friend</DropDownItem>
            <DropDownItem
                onClick={handleHelpClick} type="submit"
            >Help</DropDownItem>
            <DropDownItem
                onClick={handleSettingsClick} type="submit"
            >Settings</DropDownItem>
            <DropDownItem
                onClick={handleSignOut} type="submit"
            >Sign Out</DropDownItem>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    position: absolute;
    right: 10px;
    z-index: 10;
`

const DropDownItem = styled.button`
    padding: 10px;
    width: 100%;
    cursor: pointer;
    background: var(--color-dark);
    color: white;
    border: none;
    font-weight: 900;
    font-size: 1em;
    &:hover {
        background: var(--color-light);
    }
    &:active {
        transform: scale(0.9);
    }
    `

    const DropDownHide = styled(DropDownItem)`
        visibility: hidden;
    `


export default Dropdown;