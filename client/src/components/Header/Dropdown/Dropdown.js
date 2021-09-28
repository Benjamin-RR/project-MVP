import React, {useContext, useState} from 'react';
import { CaptureContext } from '../../CaptureContext';
import styled from 'styled-components';
import Friends from './Options/Friends'

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
        uniqueName,
        setUniqueName,
        friendClick, 
        setFriendClick
    } = useContext(CaptureContext);

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

    // hande friend being clicked
    const handleFriendClick = () => {
        // setDropdown(false)
        setFriendClick(!friendClick);
        return(
            <div>hello</div>
        )
    }

    console.log("friend:", friendClick);

    // handle sign out.
    const handleSignOut = () => {
        // remove all signed in user info from local storage.
        localStorage.removeItem("userID");
        localStorage.removeItem("uniqueName");
        setUserID(null);
        setUniqueName(null);
        window.location.reload();
    }

    return(
        <>
            { friendClick && (
                <Friends />
            )}

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
                    >Friends</DropDownItem>
                    <DropDownItem>Achievements</DropDownItem>
                    <DropDownItem>Help</DropDownItem>
                    <DropDownItem>Settings</DropDownItem>
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
                    >Friends</DropDownItem>
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