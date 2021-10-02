import React, {useContext, useState} from 'react';
import { CaptureContext } from '../../CaptureContext';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'; 


const Dropdown = () => {
    const {
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
        friendClick, 
        setFriendClick,
        settingsClick,
        setSettingsClick,
        // userColor,
        // setUserColor,
        // friendArray, 
        // setFriendArray,
    } = useContext(CaptureContext);
    let history = useHistory();

    // handle reponsive window.
    mediaQ.onchange = (e) => {
        window.location.reload();
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

    // handle friend being clicked
    const handleFriendClick = () => {
        setDropdown(false)
        setFriendClick(true);
        history.push("/Friends")
    }
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

    // console.log("friend:", friendClick);

    // handle sign out.
    const handleSignOut = () => {
        // remove all signed in user info from local storage.
        localStorage.removeItem("userID");
        localStorage.removeItem("uniqueName");
        localStorage.removeItem("userColor");
        localStorage.removeItem("friends");
        setUserID(null);
        // setUniqueName(null);
        // setUserColor(null)
        // setFriendArray(null);
        window.location.reload();
    }

    return(
        <>
            {(mediaQ.matches === true) ? (
                <Wrapper
                    style={{ top: "85px"}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <DropDownHide></DropDownHide>
                    <DropDownItem>Account</DropDownItem>
                    <DropDownItem
                        onClick={handleFriendClick} type="submit"
                    >Add a friend</DropDownItem>
                    <DropDownItem>Achievements</DropDownItem>
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
            ) : (
                <Wrapper
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <DropDownHide></DropDownHide>
                    <DropDownItem>Account</DropDownItem>
                    <DropDownItem
                        onClick={handleFriendClick} type="submit"
                    >Add a friend</DropDownItem>
                    <DropDownItem>Achievements</DropDownItem>
                    <DropDownItem>Help</DropDownItem>
                    <DropDownItem>Settings</DropDownItem>
                    <DropDownItem
                        onClick={handleSignOut} type="submit"
                    >Sign Out</DropDownItem>
                </Wrapper>
            )}
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    /* border: 1px solid black; */
    position: absolute;
    right: 10px;
    top: 80px;
    z-index: 10;
`


const DropDownItem = styled.button`
    padding: 10px;
    width: 100%;
    cursor: pointer;
    background: darkgreen;
    color: white;
    border: none;
    font-weight: 900;
    font-size: 1em;
    &:hover {
        background: green;
    }
    &:active {
        transform: scale(0.9);
    }
    `

    const DropDownHide = styled(DropDownItem)`
        visibility: hidden;
    `


export default Dropdown;